import { app, BrowserWindow, shell, dialog, Menu, ipcMain } from 'electron';
import { spawn, ChildProcess, execFileSync } from 'child_process';
import { join } from 'path';
import Store from 'electron-store';
import { readFileSync, existsSync } from 'fs';

// Store for user preferences
const store = new Store({
  defaults: {
    windowBounds: { width: 1200, height: 800 },
    lastEnvPath: '',
    autoStartBackend: true,
    openDevTools: false
  }
});

interface ServiceStatus {
  neo4j: boolean;
  graphql: boolean;
  admin: boolean;
  frontend: boolean;
}

class OrchestratorDesktopApp {
  private mainWindow: any = null;
  private backendProcess: ChildProcess | null = null;
  private frontendProcess: ChildProcess | null = null;
  private statusCheckInterval: NodeJS.Timeout | null = null;
  private backendLog: string = '';
  private frontendLog: string = '';
  
  // Paths are configured via Preferences or environment variables.
  // Use Preferences → Set Project Root / Set Frontend Root, or set env:
  //   ORCHESTRATOR_ROOT, FRONTEND_APP_ROOT
  private readonly frontendPort = 3000;
  private readonly adminPort = 3001;
  private readonly graphqlPort = 8080;

  constructor() {
    this.setupApp();
  }

  private setupApp() {
    // App event handlers
    app.whenReady().then(() => {
      // Initialize roots from env if provided and not already set
      if (process.env.ORCHESTRATOR_ROOT && !store.get('projectRoot')) {
        store.set('projectRoot', process.env.ORCHESTRATOR_ROOT);
      }
      if (process.env.FRONTEND_APP_ROOT && !store.get('frontendDir')) {
        store.set('frontendDir', process.env.FRONTEND_APP_ROOT);
      }
      this.createWindow();
    });
    
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.cleanup();
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });

    app.on('before-quit', () => {
      this.cleanup();
    });
  }

  private async createWindow() {
    const bounds = store.get('windowBounds') as any;
    
    this.mainWindow = new BrowserWindow({
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      title: 'AI Orchestrator',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      },
      icon: join(__dirname, '../resources/icon.png'),
      show: false // Don't show until ready
    });

    // Setup menu
    this.setupMenu();

    // Save window bounds when moved/resized
    this.mainWindow.on('close', () => {
      if (this.mainWindow) {
        store.set('windowBounds', this.mainWindow.getBounds());
      }
    });

    // Open external links in browser
    this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    // Ensure roots are configured; if not, open setup wizard and defer auto-start
    let projectRoot = (store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '';
    let frontendRoot = (store.get('frontendDir') as string) || process.env.FRONTEND_APP_ROOT || '';
    if (!projectRoot || !frontendRoot) {
      // Defer auto-start until roots are configured
      store.set('autoStartBackend', false);
      await this.openSettingsWindow();
      projectRoot = (store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '';
      frontendRoot = (store.get('frontendDir') as string) || process.env.FRONTEND_APP_ROOT || '';
      if (!projectRoot || !frontendRoot) {
        dialog.showErrorBox('Setup Required', 'Please set both Project Root and Frontend Root in Settings (Settings → Open Settings…).');
        return;
      }
    }

    // Start backend services if enabled
    if (store.get('autoStartBackend')) {
      await this.startBackendServices();
    }

    // Start frontend
    await this.startFrontend();

    // Wait for frontend to be ready, then show window
    await this.waitForFrontend();
    
    this.mainWindow.loadURL(`http://localhost:${this.frontendPort}/chirality-core`);
    this.mainWindow.show();

    // Open dev tools if enabled
    if (store.get('openDevTools')) {
      this.mainWindow.webContents.openDevTools();
    }

    // Start status monitoring
    this.startStatusMonitoring();
  }

  private setupMenu() {
    const template: any[] = [
      {
        label: 'AI Orchestrator',
        submenu: [
          {
            label: 'About AI Orchestrator',
            click: () => this.showAbout()
          },
          { type: 'separator' },
          {
            label: 'Preferences...',
            accelerator: 'Cmd+,',
            click: () => this.showPreferences()
          },
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'Cmd+Q',
            click: () => app.quit()
          }
        ]
      },
      {
        label: 'Services',
        submenu: [
          {
            label: 'Start Backend Services',
            click: () => this.startBackendServices()
          },
          {
            label: 'Stop Backend Services',
            click: () => this.stopBackendServices()
          },
          { type: 'separator' },
          { label: 'Restart Frontend', click: () => this.restartFrontend() },
          { type: 'separator' },
          { label: 'Set Project Root…', click: () => this.setProjectRoot() },
          { label: 'Set Frontend Root…', click: () => this.setFrontendRoot() },
          { type: 'separator' },
          {
            label: 'Check Service Status',
            click: () => this.checkServiceStatus()
          }
        ]
      },
      {
        label: 'Settings',
        submenu: [
          { label: 'Open Settings…', click: () => this.openSettingsWindow() },
          { type: 'separator' },
          { label: 'Export Settings…', click: () => this.exportSettings() },
          { label: 'Import Settings…', click: () => this.importSettings() },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Cmd+R',
            click: () => this.mainWindow?.reload()
          },
          {
            label: 'Force Reload',
            accelerator: 'Cmd+Shift+R',
            click: () => this.mainWindow?.webContents.reloadIgnoringCache()
          },
          {
            label: 'Developer Tools',
            accelerator: 'F12',
            click: () => this.mainWindow?.webContents.openDevTools()
          },
          { type: 'separator' },
          {
            label: 'Admin Dashboard',
            click: () => shell.openExternal(`http://localhost:${this.adminPort}`)
          },
          {
            label: 'GraphQL Playground',
            click: () => shell.openExternal(`http://localhost:${this.graphqlPort}/graphql`)
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          { label: 'Documentation', click: () => shell.openExternal('<backend-framework-repo-url>') },
          { label: 'Report Issue', click: () => shell.openExternal('<backend-framework-repo-issues>') },
          { type: 'separator' },
          { label: 'Run Health Check…', click: () => this.runHealthCheck() },
          { type: 'separator' },
          { label: 'View Last Errors…', click: () => this.showLastErrors() }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  private async startBackendServices(): Promise<void> {
    console.log('Starting backend services...');
    
    try {
      // Check if .env exists
      const projectRoot = (store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '';
      if (!projectRoot) {
        await this.setProjectRoot();
        return;
      }
      if (!this.validateProjectRoot(projectRoot)) {
        dialog.showErrorBox('Invalid Project Root', 'Selected folder does not appear to be a valid orchestrator project (expected scripts/chirality or compose/docker-compose.yml).');
        return;
      }
      const envPath = join(projectRoot, '.env');
      if (!existsSync(envPath)) {
        await this.showEnvSetupDialog();
        return;
      }

      // Run docker compose up
      this.backendLog = '';
      this.backendProcess = spawn('bash', ['-c', `cd "${projectRoot}" && ./scripts/chirality up`], {
        stdio: 'pipe',
        env: process.env
      });

      this.backendProcess.stdout?.on('data', (data) => {
        console.log('Backend stdout:', data.toString());
        this.backendLog += data.toString();
      });

      this.backendProcess.stderr?.on('data', (data) => {
        console.log('Backend stderr:', data.toString());
        this.backendLog += data.toString();
      });

      this.backendProcess.on('close', (code) => {
        console.log(`Backend process exited with code ${code}`);
        this.backendProcess = null;
        if (code && code !== 0) {
          store.set('lastBackendError', {
            at: new Date().toISOString(),
            code,
            log: this.backendLog.slice(-5000)
          });
        }
      });

      // Give services time to start
      await this.sleep(5000);
      
    } catch (error) {
      console.error('Failed to start backend services:', error);
      dialog.showErrorBox('Backend Error', `Failed to start backend services: ${error}`);
    }
  }

  private async stopBackendServices(): Promise<void> {
    console.log('Stopping backend services...');
    
    try {
      if (this.backendProcess) {
        this.backendProcess.kill();
        this.backendProcess = null;
      }

      // Run docker compose down
      const projectRoot = (store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '';
      const stopProcess = spawn('bash', ['-c', `cd "${projectRoot}" && ./scripts/chirality down`], {
        stdio: 'pipe'
      });

      await new Promise((resolve) => {
        stopProcess.on('close', resolve);
      });

    } catch (error) {
      console.error('Failed to stop backend services:', error);
    }
  }

  private async startFrontend(): Promise<void> {
    console.log('Starting frontend...');
    
    try {
      const frontendDir = (store.get('frontendDir') as string) || process.env.FRONTEND_APP_ROOT || '';
      if (!frontendDir) {
        await this.setFrontendRoot();
        return;
      }
      if (!this.checkNodeVersionMinimum(18)) {
        const msg = 'Node.js 18+ is required for the Frontend App.';
        store.set('lastFrontendError', { at: new Date().toISOString(), code: -2, log: msg + `\nCurrent: ${process.version}` });
        dialog.showErrorBox('Unsupported Node.js Version', `${msg}\nCurrent: ${process.version}`);
        return;
      }
      if (!this.validateFrontendRoot(frontendDir) || !this.checkNextPresence(frontendDir)) {
        dialog.showErrorBox('Invalid Frontend Root', 'Selected folder does not appear to be a valid Next.js app (expected package.json with a next dependency).');
        return;
      }
      this.frontendProcess = spawn('npx', ['next', 'dev'], {
        cwd: frontendDir,
        stdio: 'pipe',
        env: { ...process.env, PORT: this.frontendPort.toString() }
      });

      this.frontendProcess.stdout?.on('data', (data) => {
        console.log('Frontend stdout:', data.toString());
        this.frontendLog += data.toString();
      });

      this.frontendProcess.stderr?.on('data', (data) => {
        console.log('Frontend stderr:', data.toString());
        this.frontendLog += data.toString();
      });

      this.frontendProcess.on('close', (code) => {
        console.log(`Frontend process exited with code ${code}`);
        this.frontendProcess = null;
        if (code && code !== 0) {
          store.set('lastFrontendError', {
            at: new Date().toISOString(),
            code,
            log: this.frontendLog.slice(-5000)
          });
        }
      });

    } catch (error) {
      console.error('Failed to start frontend:', error);
      dialog.showErrorBox('Frontend Error', `Failed to start frontend: ${error}`);
    }
  }

  private async restartFrontend(): Promise<void> {
    if (this.frontendProcess) {
      this.frontendProcess.kill();
      this.frontendProcess = null;
      await this.sleep(2000);
    }
    
    await this.startFrontend();
    await this.waitForFrontend();
    
    this.mainWindow?.reload();
  }

  private async waitForFrontend(): Promise<void> {
    console.log('Waiting for frontend to be ready...');
    const originalTitle = this.mainWindow?.getTitle() || 'AI Orchestrator';
    for (let i = 0; i < 60; i++) { // 60 seconds max
      try {
        const response = await fetch(`http://localhost:${this.frontendPort}`);
        if (response.ok) {
          console.log('Frontend is ready!');
          this.mainWindow?.setTitle(originalTitle);
          return;
        }
      } catch (error) {
        // Not ready yet
      }
      // Update window title with progress
      this.mainWindow?.setTitle(`AI Orchestrator — Starting Frontend (${i + 1}/60)`);
      await this.sleep(1000);
    }
    this.mainWindow?.setTitle(originalTitle);
    const msg = 'Frontend failed to start within 30 seconds';
    store.set('lastFrontendError', {
      at: new Date().toISOString(),
      code: -1,
      log: (this.frontendLog || '') + `\n${msg}`
    });
    throw new Error(msg);
  }

  private async checkServiceStatus(): Promise<ServiceStatus> {
    const status: ServiceStatus = {
      neo4j: false,
      graphql: false,
      admin: false,
      frontend: false
    };

    try {
      // Check GraphQL
      const graphqlResponse = await fetch(`http://localhost:${this.graphqlPort}/health`);
      status.graphql = graphqlResponse.ok;
    } catch {}

    try {
      // Check Admin
      const adminResponse = await fetch(`http://localhost:${this.adminPort}/api/health`);
      status.admin = adminResponse.ok;
    } catch {}

    try {
      // Check Neo4j (via admin health check)
      const neo4jResponse = await fetch(`http://localhost:7474`);
      status.neo4j = neo4jResponse.ok;
    } catch {}

    try {
      // Check Frontend
      const frontendResponse = await fetch(`http://localhost:${this.frontendPort}`);
      status.frontend = frontendResponse.ok;
    } catch {}

    console.log('Service status:', status);
    return status;
  }

  private startStatusMonitoring(): void {
    this.statusCheckInterval = setInterval(async () => {
      const status = await this.checkServiceStatus();
      
      // Update window title with status
      if (this.mainWindow) {
        const statusIndicator = Object.values(status).every(s => s) ? '✅' : '⚠️';
        this.mainWindow.setTitle(`AI Orchestrator ${statusIndicator}`);
      }
    }, 10000); // Check every 10 seconds
  }

  private async showAbout(): Promise<void> {
    const version = app.getVersion();
    const message = `AI Orchestrator Desktop v${version}\n\nA complete backend + frontend orchestration environment.\n\nBuilt with Electron, Next.js, and the Backend Framework.`;
    
    dialog.showMessageBox(this.mainWindow!, {
      type: 'info',
      title: 'About AI Orchestrator',
      message,
      buttons: ['OK']
    });
  }

  private async showPreferences(): Promise<void> {
    const projectRoot = (store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '<not set>';
    const frontendRoot = (store.get('frontendDir') as string) || process.env.FRONTEND_APP_ROOT || '<not set>';
    const result = await dialog.showMessageBox(this.mainWindow!, {
      type: 'question',
      title: 'Preferences',
      message: 'AI Orchestrator Preferences',
      detail: `Current settings:\n• Project root: ${projectRoot}\n• Frontend root: ${frontendRoot}\n• Auto-start backend: ${store.get('autoStartBackend')}\n• Open dev tools: ${store.get('openDevTools')}`,
      buttons: ['Set Project Root…', 'Set Frontend Root…', 'Toggle Auto-start', 'Toggle Dev Tools', 'Close']
    });

    switch (result.response) {
      case 0:
        await this.setProjectRoot();
        break;
      case 1:
        await this.setFrontendRoot();
        break;
      case 2:
        store.set('autoStartBackend', !store.get('autoStartBackend'));
        break;
      case 3:
        store.set('openDevTools', !store.get('openDevTools'));
        break;
      default:
        break;
    }
  }

  private async showEnvSetupDialog(): Promise<void> {
    const result = await dialog.showMessageBox(this.mainWindow!, {
      type: 'warning',
      title: 'Environment Setup Required',
      message: 'No .env file found',
      detail: `Please create a .env file at:\n${(store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '<project-root>'}/.env\n\nCopy from .env.example and set your API keys.`,
      buttons: ['Open Folder', 'Cancel']
    });

    if (result.response === 0) {
      const pr = (store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '';
      if (pr) {
        shell.showItemInFolder(join(pr, '.env.example'));
      }
    }
  }

  private cleanup(): void {
    console.log('Cleaning up...');
    
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }

    if (this.frontendProcess) {
      this.frontendProcess.kill();
    }

    if (this.backendProcess) {
      this.backendProcess.kill();
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async setProjectRoot(): Promise<void> {
    const res = await dialog.showOpenDialog(this.mainWindow!, {
      title: 'Select Orchestrator Project Root',
      properties: ['openDirectory']
    });
    if (!res.canceled && res.filePaths && res.filePaths[0]) {
      const chosen = res.filePaths[0];
      if (this.validateProjectRoot(chosen)) {
        store.set('projectRoot', chosen);
      } else {
        dialog.showErrorBox('Invalid Project Root', 'Selected folder does not appear to be a valid orchestrator project (expected scripts/chirality or compose/docker-compose.yml).');
      }
    }
  }

  private async setFrontendRoot(): Promise<void> {
    const res = await dialog.showOpenDialog(this.mainWindow!, {
      title: 'Select Frontend App Root',
      properties: ['openDirectory']
    });
    if (!res.canceled && res.filePaths && res.filePaths[0]) {
      const chosen = res.filePaths[0];
      if (this.validateFrontendRoot(chosen)) {
        store.set('frontendDir', chosen);
      } else {
        dialog.showErrorBox('Invalid Frontend Root', 'Selected folder does not appear to be a valid frontend app (expected package.json).');
      }
    }
  }

  private validateProjectRoot(root: string): boolean {
    try {
      const hasScript = existsSync(join(root, 'scripts', 'chirality'));
      const hasCompose = existsSync(join(root, 'compose', 'docker-compose.yml')) || existsSync(join(root, 'docker-compose.yml'));
      const hasEnv = existsSync(join(root, '.env.example')) || existsSync(join(root, '.env'));
      return hasScript || hasCompose || hasEnv;
    } catch {
      return false;
    }
  }

  private validateFrontendRoot(root: string): boolean {
    try {
      return existsSync(join(root, 'package.json'));
    } catch {
      return false;
    }
  }

  private checkNextPresence(root: string): boolean {
    try {
      const pkgPath = join(root, 'package.json');
      if (!existsSync(pkgPath)) return false;
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      const hasDep = !!deps['next'];
      const scripts = pkg.scripts || {};
      const devScript: string = (scripts['dev'] || '') as string;
      const hasScript = devScript.includes('next');
      return hasDep || hasScript || existsSync(join(root, 'node_modules', 'next'));
    } catch {
      return false;
    }
  }

  private checkNodeVersionMinimum(minMajor: number): boolean {
    try {
      const v = process.versions.node || process.version.replace('v','');
      const major = parseInt(v.split('.')[0], 10);
      return major >= minMajor;
    } catch { return false; }
  }

  private async showLastErrors(): Promise<void> {
    const be = (store.get('lastBackendError') as any) || {};
    const fe = (store.get('lastFrontendError') as any) || {};
    const beStr = be.at ? `Backend (code ${be.code ?? 'n/a'}) @ ${be.at}\n\n${be.log || ''}` : 'No backend error recorded';
    const feStr = fe.at ? `Frontend (code ${fe.code ?? 'n/a'}) @ ${fe.at}\n\n${fe.log || ''}` : 'No frontend error recorded';
    const message = `${beStr}\n\n---\n\n${feStr}`;
    dialog.showMessageBox(this.mainWindow!, {
      type: 'info',
      title: 'Last Errors',
      message,
      buttons: ['OK']
    });
  }

  private async openSettingsWindow(): Promise<void> {
    const win = new BrowserWindow({
      width: 560,
      height: 380,
      title: 'Settings',
      resizable: false,
      modal: true,
      parent: this.mainWindow || undefined,
      webPreferences: { nodeIntegration: false, contextIsolation: true, preload: join(__dirname, '../resources/settings-preload.js') }
    });
    win.loadFile(join(__dirname, '../resources/settings.html'));

    // IPC handlers
    ipcMain.handle('prefs:get', async () => ({
      projectRoot: (store.get('projectRoot') as string) || process.env.ORCHESTRATOR_ROOT || '',
      frontendDir: (store.get('frontendDir') as string) || process.env.FRONTEND_APP_ROOT || '',
      autoStartBackend: !!store.get('autoStartBackend'),
      openDevTools: !!store.get('openDevTools'),
    }));

    ipcMain.handle('prefs:browse', async (_evt, which: 'project' | 'frontend') => {
      const res = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
      if (res.canceled || !res.filePaths || !res.filePaths[0]) return { path: '' };
      return { path: res.filePaths[0] };
    });

    ipcMain.handle('prefs:save', async (_evt, data: any) => {
      const { projectRoot, frontendRoot, autoStartBackend, openDevTools } = data || {};
      if (projectRoot && !this.validateProjectRoot(projectRoot)) {
        return { ok: false, error: 'Invalid project root (expected scripts/chirality or compose/docker-compose.yml).' };
      }
      if (frontendRoot && !this.validateFrontendRoot(frontendRoot)) {
        return { ok: false, error: 'Invalid frontend root (expected package.json).' };
      }
      if (projectRoot) store.set('projectRoot', projectRoot);
      if (frontendRoot) store.set('frontendDir', frontendRoot);
      store.set('autoStartBackend', !!autoStartBackend);
      store.set('openDevTools', !!openDevTools);
      return { ok: true };
    });

    ipcMain.handle('prefs:testBackend', async (_evt, data: any) => {
      const root = (data && data.projectRoot) || (store.get('projectRoot') as string) || '';
      const results: string[] = [];
      let ok = true;
      if (!root) { results.push('Project root not set.'); ok = false; }
      else if (!this.validateProjectRoot(root)) { results.push('Project root structure invalid (missing scripts/chirality or compose/docker-compose.yml).'); ok = false; }
      else { results.push('Project root structure ok.'); }
      if (this.dockerAvailable()) results.push('Docker binary is available.'); else { results.push('Docker binary is not available on PATH.'); ok = false; }
      if (this.dockerRunning()) results.push('Docker daemon is running.'); else { results.push('Docker daemon not reachable (is Docker Desktop running?).'); ok = false; }
      return { ok, messages: results };
    });

    ipcMain.handle('prefs:testFrontend', async (_evt, data: any) => {
      const root = (data && data.frontendRoot) || (store.get('frontendDir') as string) || '';
      const results: string[] = [];
      let ok = true;
      if (!root) { results.push('Frontend root not set.'); ok = false; }
      else if (!this.validateFrontendRoot(root)) { results.push('Frontend root invalid (missing package.json).'); ok = false; }
      else { results.push('Frontend root structure ok.'); }
      if (this.checkNextPresence(root)) results.push('Next.js presence detected.'); else { results.push('Next.js not detected (dependency, dev script, or node_modules/next missing).'); ok = false; }
      if (this.checkNodeVersionMinimum(18)) results.push(`Node.js version ok (${process.version}).`); else { results.push(`Node.js version too low (${process.version}); require v18+.`); ok = false; }
      return { ok, messages: results };
    });

    ipcMain.handle('prefs:healthCheck', async () => {
      const root = (store.get('projectRoot') as string) || '';
      if (!root) return { ok: false, output: 'Project root not set.' };
      try {
        const proc = spawn('bash', ['-lc', `cd "${root}" && ./scripts/health-check.sh`], { stdio: ['ignore','pipe','pipe'] });
        const chunks: string[] = [];
        const errs: string[] = [];
        proc.stdout.on('data', d => chunks.push(d.toString()));
        proc.stderr.on('data', d => errs.push(d.toString()));
        const code: number = await new Promise(resolve => proc.on('close', resolve as any));
        const output = chunks.join('') + (errs.length ? `\n${errs.join('')}` : '');
        store.set('lastHealthReport', output);
        return { ok: code === 0, output };
      } catch (e: any) {
        const msg = String(e?.message || e);
        store.set('lastHealthReport', msg);
        return { ok: false, output: msg };
      }
    });

    ipcMain.handle('prefs:testFrontendUI', async () => {
      try {
        const resp = await fetch(`http://localhost:${this.frontendPort}/`);
        const txt = await resp.text();
        return { ok: resp.ok, status: resp.status, body: txt.slice(0, 500) };
      } catch (e: any) {
        return { ok: false, status: 0, body: String(e?.message || e) };
      }
    });

    ipcMain.handle('prefs:testCompose', async () => {
      const root = (store.get('projectRoot') as string) || '';
      if (!root) return { ok: false, output: 'Project root not set.' };
      const composePath = existsSync(join(root, 'compose', 'docker-compose.yml'))
        ? join(root, 'compose', 'docker-compose.yml')
        : (existsSync(join(root, 'docker-compose.yml')) ? join(root, 'docker-compose.yml') : '');
      if (!composePath) return { ok: false, output: 'No docker-compose.yml found (checked compose/docker-compose.yml and docker-compose.yml).' };
      if (!this.dockerAvailable()) return { ok: false, output: 'Docker not available on PATH.' };
      if (!this.dockerRunning()) return { ok: false, output: 'Docker daemon not running.' };
      try {
        // Prefer JSON if supported
        let warnings: string[] = [];
        try {
          const json = execFileSync('docker', ['compose', '-f', composePath, 'config', '--format', 'json'], { encoding: 'utf-8' });
          const cfg = JSON.parse(json);
          warnings = this.lintComposeJson(cfg);
          return { ok: true, output: json, warnings };
        } catch {
          const out = execFileSync('docker', ['compose', '-f', composePath, 'config'], { encoding: 'utf-8' });
          warnings = this.lintCompose(out);
          return { ok: true, output: out, warnings };
        }
      } catch (e1: any) {
        try {
          // Fallback to legacy docker-compose
          let warnings: string[] = [];
          try {
            const outJson = execFileSync('docker-compose', ['-f', composePath, 'config', '--format', 'json'], { encoding: 'utf-8' });
            const cfg = JSON.parse(outJson);
            warnings = this.lintComposeJson(cfg);
            return { ok: true, output: outJson, warnings };
          } catch {
            const out2 = execFileSync('docker-compose', ['-f', composePath, 'config'], { encoding: 'utf-8' });
            warnings = this.lintCompose(out2);
            return { ok: true, output: out2, warnings };
          }
        } catch (e2: any) {
          return { ok: false, output: String((e1?.stderr?.toString?.() || e1?.message || e1) + '\n' + (e2?.stderr?.toString?.() || e2?.message || e2)) };
        }
      }
    });

    ipcMain.handle('prefs:testGraphQL', async () => {
      try {
        const resp = await fetch(`http://localhost:${this.graphqlPort}/health`);
        const txt = await resp.text();
        return { ok: resp.ok, status: resp.status, body: txt };
      } catch (e: any) {
        return { ok: false, status: 0, body: String(e?.message || e) };
      }
    });

    ipcMain.handle('prefs:testAdmin', async () => {
      try {
        const resp = await fetch(`http://localhost:${this.adminPort}/api/health`);
        const txt = await resp.text();
        return { ok: resp.ok, status: resp.status, body: txt };
      } catch (e: any) {
        return { ok: false, status: 0, body: String(e?.message || e) };
      }
    });

    win.on('closed', () => {
      // Clean handlers to avoid leaks
      ipcMain.removeHandler('prefs:get');
      ipcMain.removeHandler('prefs:browse');
      ipcMain.removeHandler('prefs:save');
      ipcMain.removeHandler('prefs:testBackend');
      ipcMain.removeHandler('prefs:testFrontend');
      ipcMain.removeHandler('prefs:healthCheck');
      ipcMain.removeHandler('prefs:testFrontendUI');
      ipcMain.removeHandler('prefs:testCompose');
      ipcMain.removeHandler('prefs:testGraphQL');
      ipcMain.removeHandler('prefs:testAdmin');
    });
  }

  private async exportSettings(): Promise<void> {
    const res = await dialog.showSaveDialog(this.mainWindow!, {
      title: 'Export Settings',
      filters: [{ name: 'JSON', extensions: ['json'] }],
      defaultPath: 'orchestrator-settings.json'
    });
    if (res.canceled || !res.filePath) return;
    const payload = {
      projectRoot: (store.get('projectRoot') as string) || '',
      frontendDir: (store.get('frontendDir') as string) || '',
      autoStartBackend: !!store.get('autoStartBackend'),
      openDevTools: !!store.get('openDevTools'),
    };
    const fs = require('fs');
    fs.writeFileSync(res.filePath, JSON.stringify(payload, null, 2), 'utf-8');
  }

  private async importSettings(): Promise<void> {
    const res = await dialog.showOpenDialog(this.mainWindow!, {
      title: 'Import Settings',
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile']
    });
    if (res.canceled || !res.filePaths || !res.filePaths[0]) return;
    try {
      const fs = require('fs');
      const raw = fs.readFileSync(res.filePaths[0], 'utf-8');
      const data = JSON.parse(raw);
      if (data.projectRoot && this.validateProjectRoot(data.projectRoot)) {
        store.set('projectRoot', data.projectRoot);
      }
      if (data.frontendDir && this.validateFrontendRoot(data.frontendDir)) {
        store.set('frontendDir', data.frontendDir);
      }
      if (typeof data.autoStartBackend === 'boolean') store.set('autoStartBackend', data.autoStartBackend);
      if (typeof data.openDevTools === 'boolean') store.set('openDevTools', data.openDevTools);
    } catch (e) {
      dialog.showErrorBox('Import Failed', 'Could not import settings file. Ensure it is a valid JSON exported by this app.');
    }
  }

  private dockerAvailable(): boolean {
    try {
      execFileSync('docker', ['--version'], { stdio: 'ignore' });
      return true;
    } catch { return false; }
  }

  private dockerRunning(): boolean {
    try {
      execFileSync('docker', ['info'], { stdio: 'ignore' });
      return true;
    } catch { return false; }
  }

  private lintCompose(configText: string): string[] {
    const warnings: string[] = [];
    const text = configText || '';
    if (!/\nservices\s*:/m.test(text)) {
      warnings.push('Compose config missing top-level services: key.');
      return warnings;
    }
    // Extract service names (two-space indented under services:)
    const lines = text.split(/\n/);
    const serviceNames: string[] = [];
    let inServices = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^services\s*:\s*$/.test(line.trim())) { inServices = true; continue; }
      if (inServices) {
        // next top-level key stops
        if (/^\S/.test(line) && line.trim().length > 0) break;
        const m = line.match(/^\s{2}([A-Za-z0-9._-]+):\s*$/);
        if (m) serviceNames.push(m[1]);
      }
    }
    if (serviceNames.length === 0) warnings.push('Compose services list appears empty.');
    // Basic per-service checks for image or build keys nearby
    for (const name of serviceNames) {
      const re = new RegExp(`^\n?\s{2}${name}:\n([\s\S]*?)(?=\n\s{2}[A-Za-z0-9._-]+:|\n\S|$)`, 'm');
      const match = text.match(re);
      const block = match ? match[1] : '';
      if (!/\b(image|build)\s*:/m.test(block)) {
        warnings.push(`Service '${name}' missing image/build declaration.`);
      }
      // Warn if no container_name or restart policy
      if (!/\brestart\s*:/m.test(block)) {
        warnings.push(`Service '${name}' has no restart policy.`);
      }
    }
    // Suggest presence of common services
    const expected = ['neo4j', 'graphql', 'admin'];
    for (const exp of expected) {
      if (!serviceNames.includes(exp)) warnings.push(`Expected service '${exp}' not found (optional, but recommended).`);
    }
    return warnings;
  }

  private lintComposeJson(cfg: any): string[] {
    const warnings: string[] = [];
    if (!cfg || typeof cfg !== 'object') {
      warnings.push('Compose JSON parse failed or invalid format.');
      return warnings;
    }
    const services = cfg.services || cfg.Services || {};
    const networks = cfg.networks || cfg.Networks || {};
    const volumes = cfg.volumes || cfg.Volumes || {};
    const serviceNames = Object.keys(services);
    if (serviceNames.length === 0) warnings.push('Compose JSON has no services defined.');

    // Track referenced networks/volumes
    const referencedNetworks = new Set<string>();
    const referencedVolumes = new Set<string>();

    for (const name of serviceNames) {
      const svc = services[name] || {};
      if (!('image' in svc) && !('build' in svc)) warnings.push(`Service '${name}' missing image/build declaration.`);
      if (!('restart' in svc)) warnings.push(`Service '${name}' has no restart policy.`);

      // Ports validation
      const ports = svc.ports || [];
      if (Array.isArray(ports)) {
        for (const p of ports) {
          if (typeof p === 'string') {
            // Accept forms like "8080:8080", "8080", "127.0.0.1:8080:8080"
            if (!/^(\d+(:\d+)?|\d+\.\d+\.\d+\.\d+:\d+:\d+|\[?[:0-9a-fA-F\]]*:\d+:\d+)$/.test(p)) {
              warnings.push(`Service '${name}' has unrecognized port mapping: '${p}'.`);
            }
          } else if (typeof p === 'object') {
            // Object form should include target
            if (!('target' in p)) warnings.push(`Service '${name}' port object missing 'target'.`);
          }
        }
      }

      // Environment variables: warn if unresolved ${VAR}
      const env = svc.environment || {};
      const entries: [string, any][] = Array.isArray(env) ? env.map((kv: any) => {
        if (typeof kv === 'string' && kv.includes('=')) {
          const idx = kv.indexOf('=');
          return [kv.slice(0, idx), kv.slice(idx + 1)];
        }
        return [String(kv), ''];
      }) : Object.entries(env);
      for (const [k, v] of entries) {
        const val = String(v ?? '');
        const m = val.match(/\$\{([^:}]+)(:[^}]*)?}/);
        if (m) {
          const varName = m[1];
          if (!process.env[varName]) warnings.push(`Service '${name}' environment '${k}' references \${'{'}${varName}{'}'} but it is not set in the current environment.`);
        }
      }

      // Networks reference check
      const svcNetworks = svc.networks || [];
      if (Array.isArray(svcNetworks)) {
        svcNetworks.forEach((n: any) => typeof n === 'string' && referencedNetworks.add(n));
      } else if (svcNetworks && typeof svcNetworks === 'object') {
        Object.keys(svcNetworks).forEach(n => referencedNetworks.add(n));
      }

      // Volumes reference check
      const svcVolumes = svc.volumes || [];
      if (Array.isArray(svcVolumes)) {
        for (const v of svcVolumes) {
          if (typeof v === 'string') {
            const vol = v.split(':')[0];
            if (vol && !vol.startsWith('/')) referencedVolumes.add(vol);
          } else if (typeof v === 'object' && v.source) {
            const vol = String(v.source);
            if (vol && !vol.startsWith('/')) referencedVolumes.add(vol);
          }
        }
      }
    }

    // Networks existence
    referencedNetworks.forEach(n => {
      if (!networks || !Object.prototype.hasOwnProperty.call(networks, n)) warnings.push(`Network '${n}' referenced by a service is not defined in top-level networks.`);
    });
    // Volumes existence
    referencedVolumes.forEach(v => {
      if (!volumes || !Object.prototype.hasOwnProperty.call(volumes, v)) warnings.push(`Volume '${v}' referenced by a service is not defined in top-level volumes.`);
    });

    // Suggest expected services
    const expected = ['neo4j', 'graphql', 'admin'];
    expected.forEach(exp => { if (!serviceNames.includes(exp)) warnings.push(`Expected service '${exp}' not found (optional, but recommended).`); });

    return warnings;
  }

  private async runHealthCheck(): Promise<void> {
    const res = await (async () => {
      const root = (store.get('projectRoot') as string) || '';
      if (!root) return { ok: false, output: 'Project root not set.' };
      try {
        const proc = spawn('bash', ['-lc', `cd "${root}" && ./scripts/health-check.sh`], { stdio: ['ignore','pipe','pipe'] });
        const chunks: string[] = [];
        const errs: string[] = [];
        proc.stdout.on('data', d => chunks.push(d.toString()));
        proc.stderr.on('data', d => errs.push(d.toString()));
        const code: number = await new Promise(resolve => proc.on('close', resolve as any));
        const output = chunks.join('') + (errs.length ? `\n${errs.join('')}` : '');
        store.set('lastHealthReport', output);
        return { ok: code === 0, output };
      } catch (e: any) {
        const msg = String(e?.message || e);
        store.set('lastHealthReport', msg);
        return { ok: false, output: msg };
      }
    })();
    this.openHealthReportWindow(res.ok);
  }

  private async openHealthReportWindow(ok: boolean): Promise<void> {
    const win = new BrowserWindow({
      width: 760,
      height: 560,
      title: 'Health Report',
      resizable: true,
      modal: true,
      parent: this.mainWindow || undefined,
      webPreferences: { nodeIntegration: false, contextIsolation: true, preload: join(__dirname, '../resources/health-report-preload.js') }
    });
    win.loadFile(join(__dirname, '../resources/health-report.html'));
    win.setTitle(ok ? 'Health Report — OK' : 'Health Report — Issues Found');
  }
}

// Start the app
new OrchestratorDesktopApp();

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('SettingsAPI', {
  get: () => ipcRenderer.invoke('prefs:get'),
  browse: (which) => ipcRenderer.invoke('prefs:browse', which),
  save: (payload) => ipcRenderer.invoke('prefs:save', payload),
  testBackend: (projectRoot) => ipcRenderer.invoke('prefs:testBackend', { projectRoot }),
  testFrontend: (frontendRoot) => ipcRenderer.invoke('prefs:testFrontend', { frontendRoot }),
  healthCheck: () => ipcRenderer.invoke('prefs:healthCheck'),
  testGraphQL: () => ipcRenderer.invoke('prefs:testGraphQL'),
  testAdmin: () => ipcRenderer.invoke('prefs:testAdmin'),
  testFrontendUI: () => ipcRenderer.invoke('prefs:testFrontendUI'),
  testCompose: () => ipcRenderer.invoke('prefs:testCompose'),
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('HealthAPI', {
  get: async () => ({ report: await window.SettingsAPI?.healthCheck?.() ? (await window.SettingsAPI.healthCheck()).output : '' }),
  loadReport: async () => {
    // Retrieve last report stored by main process
    return await ipcRenderer.invoke('health:getLast');
  }
});


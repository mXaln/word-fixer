import { Result } from 'app';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const electronHandler = {
  ipcRenderer: {
    openSelectDirectoryDialog: () => ipcRenderer.invoke('directory:select'),
    processDirectory: (directory: string) => {
      ipcRenderer.send('directory:selected', directory);
    },
    onDirectoryResult: (callback: (result: Result[]) => void) => {
      const subscription = (_event: IpcRendererEvent, result: Result[]) =>
        callback(result);
      ipcRenderer.on('directory:result', subscription);

      return () => {
        ipcRenderer.removeListener('directory:result', subscription);
      };
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;

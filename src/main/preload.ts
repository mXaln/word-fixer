// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import Result from '../types';

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

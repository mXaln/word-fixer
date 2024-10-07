import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

const mockElectron = {
  ipcRenderer: {
    openSelectDirectoryDialog: jest.fn(),
    processDirectory: jest.fn(),
    onDirectoryResult: jest.fn(),
  },
};

beforeAll(() => {
  global.window.electron = mockElectron;
});

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});

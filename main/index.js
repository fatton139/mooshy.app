"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
// Prepare the renderer once the app is ready
electron_1.app.on("ready", async () => {
    await (0, electron_next_1.default)("./");
    const mainWindow = new electron_1.BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: (0, path_1.join)(__dirname, "preload.js"),
        },
    });
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.removeMenu();
    const url = electron_is_dev_1.default ? "http://localhost:8000" : "http://127.0.0.1:5500";
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
electron_1.app.on("window-all-closed", electron_1.app.quit);

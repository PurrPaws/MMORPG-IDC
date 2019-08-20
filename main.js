const path = require("path");
const url = require("url");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

function CreateWindow()
{
    win = new BrowserWindow(
        {
            webPreferences: {
                nodeIntegration: true
            }
        }
    );
    
    win.loadURL(url.format({
        pathname: "../HTML/Startup.html",
        protocol: 'file',
        slashes: true,
    }))

    win.on('close', ()=>{
        win = null;
    })
}

app.on('ready', CreateWindow);

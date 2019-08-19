const path = require("path");
const url = require("url");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

function CreateWindow()
{
    win = new BrowserWindow();

    win.loadURL(url.format({
        pathname: path.join(__dirname,'/HTML/startup.html'),
        protocol: 'file',
        slashes: true,
    }))
    
    win.on('close', ()=>{
        win = null;
    })
}

app.on('ready', CreateWindow);

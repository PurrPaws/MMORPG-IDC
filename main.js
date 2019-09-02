const path = require("path");
const url = require("url");
const electron = require("electron");
const {BaseItem} = require("./JS/Modules/ItemClasses");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
var mainWindow;
var itemDatabase = []
const menuTemplate = [
    {
        label: 'File',
        submenu: 
        [
            {
                label: "Import"
            },
            {
                label: "Export"
            },
            {
                type: "separator"
            },
            {
                label: "Exit",
                accelerator: 'CmdOrCtrl+Q',
                click: () => {app.quit();}
            }
        ],
    },
    {
        label: 'Edit',
        submenu: 
        [
            {
                label: "Add",
                accelerator: "CmdOrCtrl+N",
                click: () => {
                    if (BrowserWindow.getFocusedWindow().getURL().includes("Overview"))
                    {
                        var win = CreateWindow(mainWindow.id,'CreateItem',"RIGHT",true, 220, 500);
                    }
                }
            },
            {
                label: "Remove",
                accelerator: "CmdOrCtrl+Del"
            },
            {
                label: "Edit",
                accelerator: "CmdOrCtrl+E"
            },
            {
                type: "separator"
            },
            {
                label: "Bulk Remove",
                accelerator: "CmdOrCtrl+Alt+Del"
            },
        ]
    },
    {
        label: "Ru's secret devtools",
        submenu: 
        [
            {
                label: "DevTools",
                accelerator: "CmdOrCtrl+Shift+I",
                click: () => {
                    BrowserWindow.getFocusedWindow().toggleDevTools();
                }
            }
        ]
    }
];

//functions
function CreateWindow(parentID, page, position = "RIGHT", unique = true, width = 800, height = 500, xOffset=0, yOffset=0)
{
    if (unique && BrowserWindow.getAllWindows().filter(x => x.getURL().includes(page))) 
    {
        try {
            BrowserWindow.getAllWindows().find(x => x.getURL().includes(page)).flashFrame(true);
            return;
        } catch (arg) {
            
        }
        
    }

    var xPos = (electron.screen.getPrimaryDisplay().bounds.width - width)/2;
    var yPos = (electron.screen.getPrimaryDisplay().bounds.height - height)/2;
    var bounds;
    var parent = GetFirstIDOrNull(parentID);

    if (parent)
    {
        bounds = parent.getBounds();

        switch (position) {
            case "TOP":
                xPos = bounds.x + ((bounds.width - width)/2) + xOffset;
                yPos = bounds.y - height + yOffset;
                break;
            case "LEFT":
                xPos = bounds.x - width + xOffset;
                yPos = bounds.y + yOffset;
                break;
            case "RIGHT":
                xPos = bounds.x + bounds.width + xOffset;
                yPos = bounds.y + yOffset;
                break;
            case "BOTTOM":
                xPos = bounds.x + ((bounds.width - width)/2) + xOffset;
                yPos = bounds.y + bounds.height  + yOffset;
                break;
            //Add cases in between if needed
            default:
                break;
        }
    }
    
    var win = new BrowserWindow(
        {
            parent: parent, 
            show: false,
            x: xPos,
            y: yPos,
            width: width,
            height: height,
            webPreferences: {
                nodeIntegration: true
            }
        }
    );
    win.once('ready-to-show', () => {
        win.show();
      });
      win.loadURL(url.format({
        pathname: "../HTML/"+ page +".html",
        protocol: 'file',
        slashes: true,
    }));
    win.on('close', ()=>{
        win = null;
    });
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    return win;
}

function GetFirstIDOrNull(windowID)
{
   if (BrowserWindow.getAllWindows().filter(x => x.id == windowID))
   {
       return BrowserWindow.getAllWindows().find(x => x.id);
   }
   return null;
}

function OpenWindow(windowID, page)
{
    var win = BrowserWindow.getAllWindows().find(x => x.id = windowID);
    win.loadURL(url.format({
        pathname: "../HTML/"+ page +".html",
        protocol: 'file',
        slashes: true,
    }));
}



//events
app.on('ready', ()=>{
    mainWindow = CreateWindow(null,"Startup");
});

ipcMain.on("Window", (event, arg, arg1, arg2, arg3, arg4, arg5, arg6, arg7,ar8) => {
    switch(arg)
    {
        case "Open":
            OpenWindow(arg1,arg2)
            break;
        case "Create":
            CreateWindow(arg1,arg2,arg3,arg4,arg5,arg6,ar7,ar8);
            break;
        case "":
            break;

        default:
            break;
    }
});

//Changes values in database. Returns a false boolean if failed.
ipcMain.on("DB_SET",(event, arg1, arg2) => { 
    switch (arg1)
    {
        case "Add":
            if (arg2 == null) {console.log("DB_SET - Add: Arg is null."); break;}
            itemDatabase.push(arg2); 
            console.log("Item Added.")
            break;
        case "Remove":
            break;
        case "Edit":
            break;

        default:
            break;
    }
});
ipcMain.on("DB_GET",(event, arg1, arg2) => {
    switch (arg1)
    {
        case "Count":
            event.returnValue = itemDatabase.length;
            break;
        case "Index":
            var returnItem = itemDatabase[arg2];
            if (returnItem == null) {console.log("DB_GET Index: '" + arg2+ "' was null."); break;}
            event.returnValue =  returnItem;
            break;
        case "All":
            event.returnValue = itemDatabase;
            break;
        default:
            break;
    }
});
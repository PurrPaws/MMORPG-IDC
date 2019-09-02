const global = require("../JS/Modules/Global");
const {ipcRenderer, remote} = require("electron");
const {BaseItem} = require("../JS/Modules/ItemClasses");



function SubmitForm() //todo: Vallidate
{
    var form = document.forms["ItemCreationForm"];

    //Checking if valid
    //...
    //...
    //...
    //...
    global.AddItem(ipcRenderer,BaseItem,form["item_name"].value,form["item_description"].value,form["item_buyPrice"].value, form["item_sellPrice"].value);
    remote.getCurrentWindow().getParentWindow().webContents.send("Item_Added");
    remote.getCurrentWindow().close();
}



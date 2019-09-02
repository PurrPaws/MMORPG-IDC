module.exports = {
    AddItem: function(ipcRender, BaseItem, name, description, buyPrice, sellPrice)
    {
        var itemToAdd = new BaseItem(ipcRenderer.sendSync("DB_GET", "Count"), name, description, buyPrice, sellPrice);
        ipcRenderer.send("DB_SET", "Add", itemToAdd);
    }
}
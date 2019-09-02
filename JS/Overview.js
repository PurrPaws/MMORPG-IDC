const {ipcRenderer} = require("electron");
ipcRenderer.on("Item_Added", (event,arg) => {
    ListItems();
});

//functions
function ListItems()
{
    const dataBaseCopy = ipcRenderer.sendSync("DB_GET", "All");
    const table = document.getElementById("ItemTableBody");

    //Remove all previous children
    while (table.lastChild)  { table.lastChild.remove();}

    //Add Header
    var hr = document.createElement("tr");
    
    var thID = document.createElement("th");
    thID.innerText = "ID";
    hr.appendChild(thID);

    var thName = document.createElement("th");
    thName.innerText = "Name";
    hr.appendChild(thName);

    var thType = document.createElement("th");
    thType.innerText = "Type";
    hr.appendChild(thType);

    var thBuyPrice = document.createElement("th");
    thBuyPrice.innerText = "BuyPrice";
    hr.appendChild(thBuyPrice);

    var thSellPrice = document.createElement("th");
    thSellPrice.innerText = "SellPrice";
    hr.appendChild(thSellPrice);

    table.appendChild(hr);
    
    //Populate div with itemData
    dataBaseCopy.forEach(item =>{
        var tr = document.createElement("tr");
        var data = [];

        var tdID = document.createElement("td");
        tdID.innerText = item.ID;
        data.push(tdID);

        var tdName = document.createElement("td");
        tdName.innerText = item.name;
        data.push(tdName);

        var tdType = document.createElement("td");
        tdType.innerText = item.typeString;
        data.push(tdType);

        var tdBuyPrice = document.createElement("td");
        tdBuyPrice.innerText = item.buyPrice;
        data.push(tdBuyPrice);

        var tdSellPrice = document.createElement("td");
        tdSellPrice.innerText = item.sellPrice;
        data.push(tdSellPrice);

        data.forEach(child => {
            table.appendChild(child);
        });


        table.appendChild(tr);
    });
}
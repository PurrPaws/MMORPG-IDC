const {ipcRenderer} = require("electron");
window.$ = window.jQuery = require('jquery');

ipcRenderer.on("Item_Added", (event,arg) => {
    ListItems();
});

$(document).ready(() => {
    //If the document is ready then set the correct heigth on the searchbox
    $(".SearchBox").css("margin-top",parseInt($(".HeaderDiv").css("height"), 10) /4 + "px");
});

//functions
function ListItems()
{
    const dataBaseCopy = ipcRenderer.sendSync("DB_GET", "All");
    const table = document.getElementById("ItemTableBody");

    console.log(dataBaseCopy); //Production: Remove

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

    var thQuality = document.createElement("th");
    thType.innerText = "Quality";
    hr.appendChild(thQuality);

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

        var tdQuality = document.createElement("td");
        tdType.innerText = item.quality.key;
        data.push(tdQuality);

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
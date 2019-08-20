const {remote} = require("electron");
const url = require("url");

var items = [
    new BaseItem(0,"Rotten Shoe!","Some old rotten shoe!",1,1),
    new BaseItem(1,"Golden Horse Armor","Some old rotten shoe!",1,1),
    new BaseItem(2,"Rollercoaster","Some old rotten shoe!",1,1),
    new BaseItem(3,"Sandals of Epic Justice!","Some old rotten shoe!",1,1),
    new BaseItem(4,"Frostmourne","Some old rotten shoe!",1,1)
];

function OpenPage(page)
{
    remote.getCurrentWindow().loadURL(url.format({
        pathname: ("../HTML/" + page),
        protocol: 'file',
        slashes: true,
    }))
}

function GetItemDBString(){
    var output = "";
    items.forEach(item => {
        output += item.name + "<br>";
    });
    document.write(output);
}

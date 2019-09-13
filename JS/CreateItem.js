//Imports
const global = require("../JS/Modules/Global");
const {ipcRenderer, remote} = require("electron");
const {BaseItem, Attributes,EquipmentSlotList,WeaponSlotList,QualityList} = require("../JS/Modules/ItemClasses");
window.$ = window.jQuery = require('jquery');

//Global Vars
var AvailableStatList = [];

//Ready event
$(document).ready(() => {
    console.log("Page Ready");
    typeSelect_OnChange();
});

// ###############
// ## functions ##
// ###############

// ##Input Creation Functions##
function CreateInputDiv()
{
    return $("<div class='InputBlock'></div>");
}
function CreateTextInput(label,name,style ="" , extra ="")
{
    var returnValue = [
        $("<label>"+label+":</label>"),
        $("<input type='text' name='"+name+"' style='"+style+"' "+extra+">")
    ]
    return returnValue;
}
function CreateTextAreaInput(label,name, placeholder="", style ="",cols=5, extra ="")
{
    var returnValue = [
        $("<label>"+label+":</label>"),
        $("<textarea type='text' cols='"+cols+"' name='"+name+"' style='"+style+"' "+extra+">"+placeholder+"</textarea>")
    ];
    return returnValue;
}
function CreateSelectInput(label,id,options, style = "", extra = "")
{
    var select;
    if (id != "") {select = ($("<select id='"+id+"' style='"+style+" "+extra+"'></select>"));}
    else{select = ($("<select style='"+style+" "+extra+"'></select>"));}
     
    options.forEach(option => {
        if (option.key)
        {
            var keyCapitalized = option.key.charAt(0).toUpperCase() + option.key.slice(1);
            select.append($("<option value='"+option.value+"'>"+keyCapitalized+"</option>"));
        }
        else 
        {
            var keyCapitalized = option.charAt(0).toUpperCase() + option.slice(1);
            select.append($("<option value='"+option+"'>"+keyCapitalized+"</option>"));
        }
    });
    if (label != "")
    {
        var returnValue = [
            $("<label>"+label+":</label>"),
            select
        ];
    }
    else {
        var returnValue = [
            select
        ];
    }

    return returnValue;
}
function AddStatInput()
{
    var select = CreateSelectInput("","",AvailableStatList,"width: 100px;","class='StatSelect'");
    var input = CreateTextInput("","Input_"+ $("option:selected",select).val(),"width: 35px;");
    $("#AddStatButton").before(
        
        CreateInputDiv().append(select, input)
    );
    AvailableStatList.splice(AvailableStatList.indexOf($("option:selected",select).val()),1);
    console.log(AvailableStatList);
}
function CreateAddStatButton()
{
    var returnValue = $("<button id='AddStatButton' style='display: block;' onclick='AddStatInput()'>Add Stat</button>");
    return returnValue;
}
function CreateBaseItemForm()
{
    returnValue = [
        CreateInputDiv().append( CreateTextInput("ID","Input_ID","width: 35px", "disabled")),
        CreateInputDiv().append( CreateSelectInput("Quality:","QualitySelect",QualityList)),
        CreateInputDiv().append( CreateTextInput("Name","Input_Name")),
        CreateInputDiv().append( CreateTextAreaInput("Description","Input_Description")),
        CreateInputDiv().append( CreateTextInput("Buy Price","Input_BuyPrice","width: 35px;")),
        CreateInputDiv().append( CreateTextInput("Sell Price","Input_SellPrice","width: 35px;"))
    ];
    $("input[name=Input_ID]").val(ipcRenderer.sendSync("DB_GET", "Count"));
    return returnValue;
}
// ----------------------------------------------------


function typeSelect_OnChange()
{
    //Remove previous elements && Reset AvailableStatList
    const formContent = $("#FormContent");
    formContent.children().remove();
    AvailableStatList = Object.keys(new Attributes());
    console.log(AvailableStatList);
    //Get typeSelect
    const typeSelect = $("#TypeSelect option:selected");
    
    switch(typeSelect.val())
    {
        case "BaseItem":
            formContent.append(CreateBaseItemForm());
            break;
        case "Consumable":
            formContent.append(
                CreateBaseItemForm(),
                CreateInputDiv().append( CreateTextInput("HP","Input_HP","width: 35px")),              
                CreateInputDiv().append( CreateTextInput("MP","Input_MP","width: 35px")),
                CreateInputDiv().append( CreateTextInput("Duration (sec)", "Input_Duration", "width: 35px;"))
            );
            break;
        case "Equipment":
                formContent.append(
                    CreateBaseItemForm(),
                    CreateInputDiv().append(CreateSelectInput("Slot","EquipmentSlotSelect",EquipmentSlotList)),
                    CreateAddStatButton()
                );
                AddStatInput();
                AddStatInput();
            break;
        case "Weapon":
                formContent.append(
                    CreateBaseItemForm(),
                    CreateInputDiv().append(CreateSelectInput("Slot","EquipmentSlotSelect",WeaponSlotList)),
                    CreateAddStatButton()
                );
               
                AddStatInput();
                AddStatInput();
            break;
    }
}

function SubmitForm() //todo: Vallidate
{
    
    //Checking if valid
    //...
    //...
    //...
    //...
    global.AddItem(ipcRenderer,BaseItem,form["item_name"].value,form["item_description"].value,form["item_buyPrice"].value, form["item_sellPrice"].value);
    remote.getCurrentWindow().getParentWindow().webContents.send("Item_Added");
    remote.getCurrentWindow().close();
}



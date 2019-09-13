//Imports
const global = require("../JS/Modules/Global");
const {ipcRenderer, remote} = require("electron");
const {BaseItem,EquipmentSlotList,WeaponSlotList,QualityList} = require("../JS/Modules/ItemClasses");
window.$ = window.jQuery = require('jquery');

//Ready event
$(document).ready(() => {
    console.log("Page Ready");
    typeSelect_OnChange();
});

// ###############
// ## functions ##
// ###############

// ##Input Creation Functions##
function CreateTextInput(label,name,style ="" , extra ="")
{
    var returnValue = $("<div class='InputBlock'></div>").append(
        $("<label>"+label+":</label>"),
        $("<input type='text' name='"+name+"' style='"+style+"' "+extra+">")
    );

    return returnValue;
}
function CreateTextAreaInput(label,name, placeholder="", style ="",cols=5, extra ="")
{
    var returnValue = $("<div class='InputBlock'></div>").append(
        $("<label>"+label+":</label>"),
        $("<textarea type='text' cols='"+cols+"' name='"+name+"' style='"+style+"' "+extra+">"+placeholder+"</textarea>")
    );

    return returnValue;
}
function CreateSelectInput(label,id,options, style = "", extra = "")
{
    var returnValue = $("<div class='InputBlock'></div>").append( $("<label>"+label+":</label>"));
    var select = ($("<select id='"+id+"' style='"+style+" "+extra+"'></select>"));
    options.forEach(option => {
        var keyCapitalized = option.key.charAt(0).toUpperCase() + option.key.slice(1);
        select.append($("<option value='"+option.value+"'>"+keyCapitalized+"</option>"));
    });
    returnValue.append(select);
    return returnValue;
}
function CreateBaseItemForm()
{
    returnValue = [
        CreateTextInput("ID","Input_ID","width: 35px", "disabled"),
        CreateSelectInput("Quality:","QualitySelect",QualityList),
        CreateTextInput("Name","Input_Name"),
        CreateTextAreaInput("Description","Input_Description"),
        CreateTextInput("Buy Price","Input_BuyPrice","width: 35px;"),
        CreateTextInput("Sell Price","Input_SellPrice","width: 35px;")
    ];
    $("input[name=Input_ID]").val(ipcRenderer.sendSync("DB_GET", "Count"));
    return returnValue;
}
// ----------------------------------------------------


function typeSelect_OnChange()
{
    //Remove previous elements
    const formContent = $("#FormContent");
    formContent.children().remove();
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
                CreateTextInput("HP","Input_HP","width: 35px"),
                CreateTextInput("MP","Input_MP","width: 35px"),
                CreateTextInput("Duration (sec)", "Input_Duration", "width: 35px;")
            );
            break;
        case "Equipment":
                formContent.append(
                    CreateBaseItemForm(),
                    CreateSelectInput("Slot","EquipmentSlotSelect",EquipmentSlotList)
                );
            break;
        case "Weapon":
                formContent.append(
                    CreateBaseItemForm(),
                    CreateSelectInput("Slot","EquipmentSlotSelect",WeaponSlotList)
                );
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



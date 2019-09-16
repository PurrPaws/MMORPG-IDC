//Imports
const global = require("../JS/Modules/Global");
const {ipcRenderer, remote} = require("electron");
const {BaseItem, Consumable, Equipment, Weapon, Attributes,EquipmentSlotList,WeaponSlotList,QualityList} = require("../JS/Modules/ItemClasses");
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
    if (id != "") {select = ($("<select id='"+id+"' style='"+style+"' "+extra+"></select>"));}
    else{select = ($("<select style='"+style+"' "+extra+"></select>"));}
     
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
            [
                $("<label>"+label+":</label>"),
                select
            ], 
            select
        ]
    }
    else {
        var returnValue = [
            [
                select
            ],
            select
        ]
    }
    return returnValue;
}
function ShiftAvailableStatList(previousValue, select)
{
    if (previousValue != null)
    {
        AvailableStatList.push(previousValue); 
        //Previous value becomes available. add to all statSelects!
        $(".StatSelect").each((index, statSelect) => {
            if (select.val() != $(statSelect).val()){
                var keyCapitalized = previousValue.charAt(0).toUpperCase() + previousValue.slice(1);
                $(statSelect).append($("<option value='"+previousValue+"'>"+keyCapitalized+"</option>"));
            }
        });
    }

    AvailableStatList.splice(AvailableStatList.indexOf(select.find('option:selected').val()),1) 
    //New value becomes unavailable. remove from all statSelects!
    $(".StatSelect").each((index, statSelect) => {
        if ($(statSelect).find("option:selected").val() != select.find("option:selected").val())
        {
            $(statSelect).find("option[value='"+select.find("option:selected").val()+"']").remove();
        }
    });

    //Change the Input_X name so it matches it's selection.
    var valueCapitalized = select.val().charAt(0).toUpperCase() + select.val().slice(1);
    select.attr("name","Input_"+valueCapitalized);
}
function AddStatInput()
{
    var result = CreateSelectInput("","",AvailableStatList,"width: 100px;","class='StatSelect'");
    var selectString = result[0];
    var select =  result[1];
    var input = CreateTextInput("","Input_"+ select.find("option:selected").val(),"width: 35px;");
    var previousValue;
    select.on("focus", () =>{
        previousValue = select.find('option:selected').val()
    }).change(() => {
        ShiftAvailableStatList(previousValue,select);
    });
    ShiftAvailableStatList(null,select);
    $("#AddStatButton").before(
        CreateInputDiv().append(selectString, input)
    );
    console.log(AvailableStatList);
}
function CreateAddStatButton()
{
    var returnValue = $("<button id='AddStatButton' style='display: block; margin-top: 20px;' type='button' onclick='AddStatInput()' >Add Stat</button>");
    return returnValue;
}
function CreateBaseItemForm()
{
    returnValue = [
        CreateInputDiv().append( CreateTextInput("ID","Input_ID","width: 35px", "disabled")),
        CreateInputDiv().append( CreateSelectInput("Quality","QualitySelect",QualityList)[0]),
        CreateInputDiv().append( CreateTextInput("Name","Input_Name")),
        CreateInputDiv().append( CreateTextAreaInput("Description","Input_Description")),
        CreateInputDiv().append( CreateTextInput("Buy Price","Input_BuyPrice","width: 35px;")),
        CreateInputDiv().append( CreateTextInput("Sell Price","Input_SellPrice","width: 35px;"))
    ];
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
            $("input[name='Input_ID']").val(ipcRenderer.sendSync("DB_GET", "Count"));

            break;
        case "Consumable":
            formContent.append(
                CreateBaseItemForm(),
                CreateInputDiv().append( CreateTextInput("HP","Input_HP","width: 35px")),              
                CreateInputDiv().append( CreateTextInput("MP","Input_MP","width: 35px")),
                CreateInputDiv().append( CreateTextInput("Duration (sec)", "Input_Duration", "width: 35px;"))
            );
            $("input[name='Input_ID']").val(ipcRenderer.sendSync("DB_GET", "Count"));

            break;
        case "Equipment":
                formContent.append(
                    CreateBaseItemForm(),
                    CreateInputDiv().append(CreateSelectInput("Slot","EquipmentSlotSelect",EquipmentSlotList)[0]),
                    CreateAddStatButton()
                );
                $("input[name='Input_ID']").val(ipcRenderer.sendSync("DB_GET", "Count"));

            break;
        case "Weapon":
                formContent.append(
                    CreateBaseItemForm(),
                    CreateInputDiv().append(CreateSelectInput("Slot","EquipmentSlotSelect",WeaponSlotList)[0]),
                    CreateAddStatButton()
                );
                $("input[name='Input_ID']").val(ipcRenderer.sendSync("DB_GET", "Count"));

            break;
    }
}

function SubmitForm() //todo: Vallidate fields
{
    var itemToAdd;
    const form = $("form[name='ItemCreationForm']");
    const typeSelect = $("#TypeSelect option:selected");
    const qualitySelect = $("#QualitySelect option:selected");
    var inputValues = form.serializeArray();

    console.log(inputValues); //Production: Remove!

    switch(typeSelect.val())
    {
        case "BaseItem":
            itemToAdd = new BaseItem(
                ipcRenderer.sendSync("DB_GET", "Count"),
                inputValues.find(x => x.name == "Input_Name").value,
                inputValues.find(x => x.name == "Input_Description").value,
                inputValues.find(x => x.name == "Input_BuyPrice").value,
                inputValues.find(x => x.name == "Input_SellPrice").value,
                QualityList[qualitySelect.val()]
                );
            break;
        case "Consumable":
            itemToAdd = new Consumable(
                ipcRenderer.sendSync("DB_GET", "Count"),
                inputValues.find(x => x.name == "Input_Name").value,
                inputValues.find(x => x.name == "Input_Description").value,
                inputValues.find(x => x.name == "Input_BuyPrice").value,
                inputValues.find(x => x.name == "Input_SellPrice").value,
                QualityList[qualitySelect.val()],
                inputValues.find(x => x.name == "Input_HP").value,
                inputValues.find(x => x.name == "Input_MP").value,
                inputValues.find(x => x.name == "Input_Duration").value,
                );
            break;
        case "Equipment":
            const equipmentSlotSelect = $("#EquipmentSlotSelect option:selected");
            var stats = new Attributes();
            inputValues.forEach(inputValue => {
                propertyName = inputValue.name.replace("Input_","");
                stats[propertyName] = inputValue.value;
            });
            itemToAdd = new Equipment(
                ipcRenderer.sendSync("DB_GET", "Count"),
                inputValues.find(x => x.name == "Input_Name").value,
                inputValues.find(x => x.name == "Input_Description").value,
                inputValues.find(x => x.name == "Input_BuyPrice").value,
                inputValues.find(x => x.name == "Input_SellPrice").value,
                QualityList[qualitySelect.val()],
                stats,
                EquipmentSlotList[equipmentSlotSelect.val()]
                );
            break;
        case "Weapon":
            const weaponSlotSelect = $("#WeaponSlotSelect option:selected");
            var stats = new Attributes();
            inputValues.forEach(inputValue => {
                propertyName = inputValue.name.replace("Input_","");
                stats[propertyName] = inputValue.value;
            });
            itemToAdd = new Weapon(
                ipcRenderer.sendSync("DB_GET", "Count"),
                inputValues.find(x => x.name == "Input_Name").value,
                inputValues.find(x => x.name == "Input_Description").value,
                inputValues.find(x => x.name == "Input_BuyPrice").value,
                inputValues.find(x => x.name == "Input_SellPrice").value,
                QualityList[qualitySelect.val()],
                stats,
                WeaponSlotList[weaponSlotSelect.val()]
                );
            break;
    }
    //Item is created -- send it over to the main script!
    ipcRenderer.send("DB_SET", "Add", itemToAdd);
    remote.getCurrentWindow().getParentWindow().webContents.send("Item_Added");
    remote.getCurrentWindow().close();
}
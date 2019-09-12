//Imports
const global = require("../JS/Modules/Global");
const {ipcRenderer, remote} = require("electron");
const {BaseItem} = require("../JS/Modules/ItemClasses");
window.$ = window.jQuery = require('jquery');

//Ready event
$(document).ready(() => {
    console.log("Page Ready");
    typeSelect_OnChange();
});

//functions
function typeSelect_OnChange()
{
    //Remove previous elements
    const formContent = $("#FormContent");
    formContent.children().remove();
    //Get typeSelect
    const typeSelect = $("#TypeSelect option:selected");

    switch(typeSelect.val())
    {  //TODO: fix hierarchy and seperate into functions
        case "BaseItem":
            //TODO: Make functions returning an created object
            formContent.append(
                $("<div class='InputBlock'></div>").append(
                    $("<label>ID:</label>"),
                    $("<input type='text' name='Input_ID' style='width: 35px' disabled>")
                ),
                
                $("<div class='InputBlock'></div>").append(
                    $("<label>Quality:</label>"),
                    $("<select id='QualitySelect'> <option value='0'>Poor</option> <option value='1'>Common</option> <option value='2'>Uncommon</option> <option value='3'>Rare</option> <option value='4'>Epic</option> <option value='5'>Legendary</option> </select>")
                ),

                $("<div class='InputBlock'></div>").append(
                    $('<label>Name:</label>'),
                    $("<input type='text' name='Input_Name'>")
                ),
                
                $("<div class='InputBlock'></div>").append(
                    $('<label>Description:</label>'),
                    $("<textarea cols='5' name='Input_Description'></textarea>")
                ),
                
                
                $("<div class='InputBlock'></div>").append(
                    $('<label>Buy Price:</label>'),
                    $("<input type='text' name='Input_BuyPrice' style='width: 35px;'>")
                ),
                
                
                $("<div class='InputBlock'></div>").append(
                    $('<label>Sell Price:</label>'),
                    $("<input type='text' name='Input_SellPrice' style='width: 35px;'>")   
                )
            );
            $("input[name=Input_ID]").val(ipcRenderer.sendSync("DB_GET", "Count"));
            break;
        case "Consumable":
            formContent.append(
                $("<div class='InputBlock'></div>").append(
                    $("<label style='margin-right: 3px'>ID:</label>"),
                    $("<input type='text' name='Input_ID' style='width: 35px' disabled>")
                ),
                
                $("<div class='InputBlock'></div>").append(
                    $("<label style='margin-right: 3px'>Quality:</label>"),
                    $("<select id='QualitySelect'> <option value='0'>Poor</option> <option value='1'>Common</option> <option value='2'>Uncommon</option> <option value='3'>Rare</option> <option value='4'>Epic</option> <option value='5'>Legendary</option> </select>")
                ),

                $("<div class='InputBlock'></div>").append(
                    $('<label>Name:</label>'),
                    $("<input type='text' name='Input_Name'>")
                ),
                
                $("<div class='InputBlock'></div>").append(
                    $('<label>Description:</label>'),
                    $("<textarea cols='5' name='Input_Description'></textarea>")
                ),
                
                
                $("<div class='InputBlock'></div>").append(
                    $('<label>Buy Price:</label>'),
                    $("<input type='text' name='Input_BuyPrice' style='width: 35px;'>")
                ),
                
                
                $("<div class='InputBlock'></div>").append(
                    $('<label>Sell Price:</label>'),
                    $("<input type='text' name='Input_SellPrice' style='width: 35px;'>")   
                ),

                $("<div class='InputBlock'></div>").append(
                    $('<label>HP</label>'),
                    $("<input type='text' name='Input_HP' style='width: 35px;'>")   
                ),
                $("<div class='InputBlock'></div>").append(
                    $('<label>MP:</label>'),
                    $("<input type='text' name='Input_MP' style='width: 35px;'>")   
                ),
                $("<div class='InputBlock'></div>").append(
                    $('<label>Duration (sec):</label>'),
                    $("<input type='text' name='Input_Duration' style='width: 35px;'>")   
                )
            );
            $("input[name=Input_ID]").val(ipcRenderer.sendSync("DB_GET", "Count"));
            break;
        case "OneHand":
            break;
        case "TwoHand":
            break;
        case "OffHand":
            break;
        case "Equipment":
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



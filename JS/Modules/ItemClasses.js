var QualityEnum = {
    poor: 0,
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
  };


class BaseItem
{
    ID;
    name;
    description;
    buyPrice;
    sellPrice;
    quality;

    typeString = "BaseItem";
    constructor(ID,name,description,buyPrice,sellPrice){
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
    }
}
class Weapon extends BaseItem 
{
    damagePerSecond = 0;

    constructor(ID,name,description,buyPrice,sellPrice,damagePerSecond){
        super(ID,name,description,buyPrice,sellPrice);
        
        this.typeString = "Weapon";
        this.damagePerSecond = damagePerSecond;
    }
}
class Equipment extends BaseItem 
{
    armor = 0;
    //add stats here
    constructor(ID,name,description,buyPrice,sellPrice,armor){
        super(ID,name,description,buyPrice,sellPrice)
        this.itemString = "Equipment"
        this.armor = armor;
    }   
}
class Consumable extends BaseItem 
{
    //props here:

    constructor(ID,name,description,buyPrice,sellPrice){
        super(ID,name,description,buyPrice,sellPrice)
        this.typeString = "Consumable";
    }
}
class TwoHand extends Weapon 
{
    constructor(ID,name,description,buyPrice,sellPrice,damagePerSecond){
        super(ID,name,description,buyPrice,sellPrice,damagePerSecond);
        this.typeString = "2H-Weapon";

    }
}
class OneHand extends Weapon 
{
    constructor(ID,name,description,buyPrice,sellPrice,damagePerSecond){
        super(ID,name,description,buyPrice,sellPrice,damagePerSecond);
        this.typeString = "1H-Weapon";

    }
}
class OffHand extends Equipment 
{
    constructor(ID,name,description,buyPrice,sellPrice,armor){
        super(ID,name,description,buyPrice,sellPrice,damagePerSecond);
        this.typeString = "Off-Hand";

    }
}

module.exports = 
{
    BaseItem,
    Consumable,
    OffHand,
    OneHand,
    TwoHand,
    Weapon,
    Equipment,


    QualityEnum
};
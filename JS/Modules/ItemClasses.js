var QualityEnum = {
    poor: 0,
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
  };
class Attributes { //Attribute data. instantiated on each item object.
    armor = 0;
    weaponDamage = 0;
    stamina = 0;
    strength = 0;
    agility = 0;
    intellect = 0;
    haste = 0;
    criticalStrike = 0;    
    constructor({armor: armor,weaponDamage: weaponDamage,stamina: stamina,strength: strength,agility: agility,intellect: intellect,haste: haste,criticalStrike: criticalStrike} = {})
    {
       this.armor = armor;
       this.weaponDamage = weaponDamage;
       this.stamina = stamina;
       this.strength = strength;
       this.agility = agility;
       this.intellect = intellect;
       this.haste = haste;
       this.criticalStrike = criticalStrike; 
    }
}

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
    stats; //gets defined in constructor
    constructor(ID,name,description,buyPrice,sellPrice,{armor: armor = 0,weaponDamage: weaponDamage=0, stamina: stamina=0,strength: strength=0,agility: agility=0, intellect: intellect=0, haste: haste=0, criticalStrike: criticalStrike=0} = {statObject}){
        super(ID,name,description,buyPrice,sellPrice);
        stats = new Attributes(statObject);
        this.typeString = "Weapon";
    }
}
class Equipment extends BaseItem 
{
    stats = new Attributes();
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
    hp;
    mp;
    duration; //in seconds

    constructor(ID,name,description,buyPrice,sellPrice,hp,mp,duration){
        super(ID,name,description,buyPrice,sellPrice)
        this.typeString = "Consumable";
        this.hp = hp;
        this.mp = mp;
        this.duration = duration;
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
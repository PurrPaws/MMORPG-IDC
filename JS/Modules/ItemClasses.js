const QualityList = [
    {key: "poor", value: 0},
    {key: "common", value: 1},
    {key: "uncommon", value: 2},
    {key: "rare", value: 3},
    {key: "epic", value: 4},
    {key: "legendary", value: 5},
];
const EquipmentSlotList = [
    {key: "head", value: 0},
    {key: "shoulders", value: 1},
    {key: "chest", value: 2},
    {key: "wrists", value: 3},
    {key: "hands", value: 4},
    {key: "waist", value: 5},
    {key: "legs", value: 6},
    {key: "feet", value: 7},
    {key: "neck", value: 8},
    {key: "finger1", value: 9},
    {key: "finger2", value: 10},
    {key: "trinket1", value: 11},
    {key: "trinket2", value: 12},
]
const WeaponSlotList = [
    {key: "mainHand", value: 0},
    {key: "offHand", value: 1},
    {key: "twoHand", value: 2},
]
class Attributes { 
    //Attribute class -- Instantiated on each object that inherits from 
    // Equipment
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
    //maxStackSize
    typeString = "BaseItem";
    constructor(ID,name,description,buyPrice,sellPrice,quality){
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.quality = quality;
    }
}
class Weapon extends BaseItem 
{
    stats = new Attributes();
    slot;
    constructor(ID,name,description,buyPrice,sellPrice,quality, stats, slot){
        super(ID,name,description,buyPrice,sellPrice,quality);
        this.stats = stats;
        this.slot = slot;
        this.typeString = "Weapon";
    }
}
class Equipment extends BaseItem 
{
    stats = new Attributes();
    slot;
    constructor(ID,name,description,buyPrice,sellPrice,quality, stats, slot){
        super(ID,name,description,buyPrice,sellPrice,quality)
        this.slot = slot;
        this.stats = stats;
        this.itemString = "Equipment";
    }   
}
class Consumable extends BaseItem 
{
    //props here:
    hp;
    mp;
    duration; //in seconds

    constructor(ID,name,description,buyPrice,sellPrice, quality,hp,mp,duration){
        super(ID,name,description,buyPrice,sellPrice,quality)
        this.typeString = "Consumable";
        this.hp = hp;
        this.mp = mp;
        this.duration = duration;
    }
}

module.exports = 
{
    BaseItem,
    Consumable,
    Weapon,
    Equipment,

    Attributes,

    QualityList,
    EquipmentSlotList,
    WeaponSlotList
};
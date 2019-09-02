module.exports = {
    BaseItem: class {
        ID;
        name;
        description;
        buyPrice;
        sellPrice;
    
        typeString = "BaseItem";
        constructor(ID,name,description,buyPrice,sellPrice){
            this.ID = ID;
            this.name = name;
            this.description = description;
            this.buyPrice = buyPrice;
            this.sellPrice = sellPrice;
        }
    }    
}
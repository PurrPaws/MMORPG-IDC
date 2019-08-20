class BaseItem {
    itemID;
    name;
    decription;
    buyPrice;
    vendorPrice;
    constructor(itemID,name,decription,buyPrice,vendorPrice){
        this.itemID = itemID;
        this.name = name;
        this.decription = decription;
        this.buyPrice = buyPrice;
        this.vendorPrice = vendorPrice;
    }
  }
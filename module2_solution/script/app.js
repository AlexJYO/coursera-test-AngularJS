(function (){
'use stricnt'

angular.module("ShoppingListCheckOff",[])
.controller("ToBuyController",ToBuyController)
.controller("AlreadyBoughtController",AlreadyBoughtController)
.service("ShoppingListCheckOffService",ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService){
  var buy=this;
  buy.errorMessage="Everything is bought!";
  var buyList=[{name:'milks',quantity:10},{name:'chocolates',quantity:3},
  {name:'cookies',quantity:100},{name:'donuts',quantity:5},{name:'pepto bismol',quantity:2}];

  for(item in buyList)
    ShoppingListCheckOffService.addBuyList(buyList[item].name,buyList[item].quantity);

  buy.removeItem=function (indexItem) {
      var removeBuyList={};
      removeBuyList=ShoppingListCheckOffService.removeBuyList(indexItem);
      ShoppingListCheckOffService.addBoughtList(removeBuyList.name,removeBuyList.quantity);
    };
  buy.error=function () {
    buy.items=ShoppingListCheckOffService.getBuyList();
    if(buy.items.length==0){
      return true;
    }
    return false;
  };
  buy.items=ShoppingListCheckOffService.getBuyList();


}

AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var bought=this;
  bought.items=ShoppingListCheckOffService.getBoughtList();
  bought.errorMessage="Nothing bought yet.";
  bought.error=function () {
      bought.items=ShoppingListCheckOffService.getBoughtList();
      if(bought.items.length==0)
      {
          return true;
      }
      return false;
  }

}

function ShoppingListCheckOffService(){
  var service = this;

  var buyList = [];
  var boughtList = [];

  service.addBuyList = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    buyList.push(item);
  };
  service.removeBuyList = function (itemIdex) {
    var removeItem={
      name: buyList[itemIdex].name,
      quantity: buyList[itemIdex].quantity
    };
    buyList.splice(itemIdex, 1);
    return removeItem;
  };
  service.addBoughtList= function (itemName,quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtList.push(item);
  };
  service.getBuyList= function () {
    return buyList;
  };
  service.getBoughtList= function () {
    return boughtList;
  };
}
})();

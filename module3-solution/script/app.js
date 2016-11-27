(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  //.service('MenuListService', MenuListService)
  .directive('foundItems', FoundItems);


  function FoundItems() {
    var ddo = {
      scope : {
        items: '=',
        onRemove: '&',
        message: '@message'
      },
      templateUrl: "itemsloaderindicator.html",
      controller: NarrowItDownController,
      controllerAs: 'narrow',
      bindToController: true
    };

    return ddo;
  }

  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow=this;

    narrow.searchTerm="";
    narrow.message="";
    narrow.items=[];

    narrow.getMatchedMenuItems= function () {
      narrow.message="";
      narrow.items=[];
      var promise=MenuSearchService.getMatchedMenuItems();
      promise.then(function (response) {
        var menu = response.data;
        if(menu.menu_items.length!==0 && narrow.searchTerm!==""){
          var indexItemSearch=0;
          //console.log(menu.menu_items);
          for(var i=0; i < menu.menu_items.length; i++){

            if(menu.menu_items[i].description.indexOf(narrow.searchTerm)!==-1){
              narrow.items[indexItemSearch]=menu.menu_items[i];
              indexItemSearch++;
            }
          }
          if(narrow.items.length===0){
            narrow.message="Nothing found";
          }
        }else {
          narrow.message="Nothing found";
        }
        console.log("There are "+ narrow.items.length + " found elements");
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

    }

    narrow.removeItem = function (itemIndex) {
      narrow.items.splice(itemIndex, 1);
    };


  }

  MenuSearchService.$inject=['$http'];
  function MenuSearchService ($http) {
  var service=this;


    service.getMatchedMenuItems=function () {
      var response= $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });
      return response;
    };
  }



})();

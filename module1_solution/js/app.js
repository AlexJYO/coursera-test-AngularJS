( function () {

'use strict'

angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message="";//input message (string)
  $scope.messagePlaceHolder="";//output message (string)


  $scope.SayPhrase=function () {//show output message
    $scope.styleMessage="styleGreen";
    var arrayString={};//input message in an array
    var coutEmptyStr=0;
    arrayString.onlyOneEle=false;
    arrayString.data=[];
    arrayString=splitMessage($scope.message);//generate array input message
   coutEmptyStr=coutEmpty(arrayString);//Count non-empty strings in an arrayString
    if (coutEmptyStr==0) {
      $scope.messagePlaceHolder="Please enter data first";
      $scope.styleMessage="styleRed";
    }
    else if (coutEmptyStr<4) {
        $scope.messagePlaceHolder="Enjoyt";
    }
    else {
        $scope.messagePlaceHolder="Too much!";
    }
  }
  function splitMessage(listS) {
    var auxArray={};
    var cont=0;
    auxArray.onlyOneEle=false;
    auxArray.data=[];
    for(var i=0;i<listS.length;i++)
    {
      if (listS[i]==','){
        cont++;
      }
    }

    if (cont==0){

      if(!vEmpty(listS))
      {
        auxArray.data=listS;
        auxArray.onlyOneEle=true;

      }
    }
    else {
        auxArray.data=listS.split(',',cont+1);
      }

    return auxArray;
  }
  function coutEmpty(arrayString){
    var cout=0;
    if(arrayString.data!=""){
      if(arrayString.onlyOneEle){
        cout=1;

      }
      else {
        for(var i=0; i< arrayString.data.length;i++){
          if (!vEmpty(arrayString.data[i])){
            cout++;
          }
        }
      }
    }

    return cout;
  }
  function vEmpty(listS){
    if (listS==="")
      return true;

    for(var i=0;i<listS.length;i++){
      if(listS[i]!=" ")
        return false;
    }
    return true;
  }
}



})();

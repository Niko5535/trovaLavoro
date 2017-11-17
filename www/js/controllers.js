angular.module('starter.controllers', [])

.factory('Offerte', function() {
  var offerte = {};
  return{
    getOfferte:function(){
      return offerte;
    },
    setOfferte: function(param)
    {
      offerte = param;
    }
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // // With the new view caching in Ionic, Controllers are only called
  // // when they are recreated or on app start, instead of every page change.
  // // To listen for when this page is active (for example, to refresh data),
  // // listen for the $ionicView.enter event:
  // //$scope.$on('$ionicView.enter', function(e) {
  // //});
  //
  // // Form data for the login modal
  // $scope.loginData = {};
  //
  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
  //
  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };
  //
  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };
  //
  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);
  //
  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
.controller('ListaOfferteCtrl', function($scope,$http,Offerte)
{
  var link = "http://trovalavoro.altervista.org/select.php";

  $http.get(link,
    {
      params:
      {
        tabella: 'offerte'
      }
  }).then(function(response)
  {
      Offerte.setOfferte(response.data.offerte);
      $scope.myWelcome = response.data.offerte;
  }).catch(function(error)
    {
      console.log(error);
    });
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
.controller('LavoroCtrl', function($scope, $stateParams, $http , Offerte)
{
  $scope.lin = $stateParams.lavoroId;
  $scope.offerte = Offerte.getOfferte();
})

.controller('inserisciOffertaCtrl', function($scope, $stateParams, $http , Offerte)
{
});

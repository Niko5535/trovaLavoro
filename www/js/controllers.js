angular.module('starter.controllers', [])

.run(function($rootScope)
{
    $rootScope.id_azienda = 0 ;
    $rootScope.loggato = false;
})

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


.controller('AppCtrl', function($scope, $ionicModal, $timeout , $http , $rootScope,$state)
{
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.goLogin = function()
  {
    $state.go("app.Login");
  }
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function()
  {
    if($scope.loginData.username == null || $scope.loginData.password == null)
    {
        window.alert('Inserisci tutti i campi');
    }
    else
    {
      var link = "http://trovalavoro.altervista.org/login.php?email_azienda=" + $scope.loginData.username + "&pass=" + $scope.loginData.password;

      $http.get(link,
        {
          params:
          {
            tabella: 'aziende'
          }
      }).then(function(response)
      {
          $scope.risposta = response.data;

          if($scope.risposta == 0)
          {
            window.alert("E-mail o password errati");
          }
          else
          {
            window.alert("Login effettuato correttamente");
            $rootScope.id_azienda = $scope.risposta;
            $rootScope.loggato = true;
            $state.go("app.laMiaAzienda");
          }
      }).catch(function(error)
        {
          console.log(error);
        });
    }


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

.controller('ListaOfferteCtrl', function($scope,$http,Offerte)
{
  var link = "http://trovaLavoro.altervista.org/select.php";

  $http.get(link,
    {
      params:
      {
        tabella: 'offerte'
      }
  }).then(function(response)
  {
      Offerte.setOfferte(response.data.offerte);
      $scope.offerte = response.data.offerte;
  }).catch(function(error)
    {
      console.log(error);
    });


})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
.controller('LavoroCtrl', function($scope, $stateParams, $http , Offerte )
{
    $scope.lin = $stateParams.lavoroId;
    $scope.offerte = Offerte.getOfferte();


        var linkAzienda = "http://trovaLavoro.altervista.org/offertePerAzienda.php?id=" + $scope.offerte[$scope.lin].azienda;
      $http.get(linkAzienda).then(function(response)
      {
          $scope.azienda = response.data.aziende;
      }).catch(function(error)
        {
          console.log(error);
        });
})

.controller('inserisciOffertaCtrl', function($scope, $stateParams, $http , Offerte , $rootScope)
{
  $scope.cambia = function()
  {
    window.alert("dio");
    $state.go("app.laMiaAzienda");
  }
})

.controller('HomeCtrl', function($scope, $stateParams, $http , $rootScope)
{

})

.controller('registrazioneAziendaCtrl', function($scope, $stateParams, $http,)
{
  $scope.cambia = function()
  {
    console.log("dio");
    window.location.replace("#/app/laMiaAzienda");
  }
})

.controller('AziendaCtrl', function($scope, $stateParams, $http ,$rootScope,$state)
{
  if($rootScope.loggato)
  {
    var link = "http://trovaLavoro.altervista.org/select.php";

    $http.get(link,
      {
        params:
        {
          tabella: 'aziende'
        }
      }).then(function(response)
      {
        $scope.myWelcome = response.data.aziende;
      }).catch(function(error)
      {
      console.log(error);
      });
    }
    else
    {
      $state.go("app.Login");

      var link = "http://trovaLavoro.altervista.org/select.php";

      $http.get(link,
        {
          params:
          {
            tabella: 'aziende'
          }
        }).then(function(response)
        {
          $scope.myWelcome = response.data.aziende;
        }).catch(function(error)
        {
        console.log(error);
        });
    }
})

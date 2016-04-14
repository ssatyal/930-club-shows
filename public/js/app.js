"use strict";

(function(){
  angular
  .module("shows", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  .factory("Show", [
    "$resource",
    Show
  ])
  .controller("showIndexCtrl", [
    "Show",
    showIndexCtrl
  ])
  .controller("showShowCtrl", [
    "Show",
    "$stateParams",
    "$window",
    "$state",
    showShowCtrl
  ]);

  function Show($resource){
    var Show = $resource("/api/shows/:headliner", {}, {
      update: {method: "PUT"}
    });
    Show.all = Show.query();
    Show.find = function(property, value, callback){
      Show.all.$promise.then(function(){
        Show.all.forEach(function(show){
          if(show[property] == value) callback(show);
        });
      });
    };
    return Show;
  }

  function showIndexCtrl(Show){
    var vm = this;
    vm.shows = Show.all;
  };

  function showShowCtrl(Show, $stateParams, $window, $state){
    var vm = this;
    Show.find("headliner", $stateParams.headliner, function(show){
      vm.show = show;
    });
    vm.update = function(){
      Show.update({headliner: vm.show.headliner}, {show: vm.show}, function(){
        $state.go("index")
      });
    };
    vm.delete = function(){
      Show.remove({headliner: vm.show.headliner}, function(){
        $window.location.replace("/");
      });
    };
  }

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("index", {
      url: "/shows",
      templateUrl: "/assets/html/shows-index.html",
      controller: "showIndexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/shows/:headliner",
      templateUrl: "/assets/html/shows-show.html",
      controller: "showShowCtrl",
      controllerAs: "showVM"
    });
  }
})();

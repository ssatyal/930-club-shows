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
    vm.shows = Show.all
  };

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $stateProvider
    .state("index", {
      url: "/shows",
      templateUrl: "assets/html/shows-index.html",
      controller: "showIndexCtrl",
      controllerAs: "indexVM"
    });
  }
})();

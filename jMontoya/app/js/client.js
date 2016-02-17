const angular = require('angular');

const politiciansApp = angular.module('politiciansApp', []);

politiciansApp.controller('politiciansController', ['$scope', '$http', ($scope, $http) => {
  $scope.demGreeting = 'Hello Democrat Voters';
  $scope.demPoliticians = [];

  $scope.repGreeting = 'Hello Republican Voters';
  $scope.repPoliticians = [];

  $http.get('http://localhost:5000/api/demPoliticians')
    .then((res) => {
      console.log('success!');
      $scope.demPoliticians = res.data;
    }, (err) => {
      console.log(err);
    });

  $http.get('http://localhost:5000/api/repPoliticians')
    .then((res) => {
      console.log('success!');
      $scope.repPoliticians = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createDemPolitician = function(demPolitician) {
    $http.post('http://localhost:5000/api/demPoliticians', demPolitician)
      .then((res) => {
        $scope.demPoliticians.push(res.data);
        $scope.demPolitician = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.createRepPolitician = function(repPolitician) {
    $http.post('http://localhost:5000/api/repPoliticians', repPolitician)
      .then((res) => {
        $scope.repPoliticians.push(res.data);
        $scope.repPolitician = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteDemPolitician = function(demPolitician) {
    $http.delete('http://localhost:5000/api/demPoliticians/' + demPolitician._id)
      .then((res) => {
        $scope.demPoliticians = $scope.demPoliticians.filter((i) => i !== demPolitician);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteRepPolitician = function(repPolitician) {
    $http.delete('http://localhost:5000/api/repPoliticians/' + repPolitician._id)
      .then((res) => {
        $scope.repPoliticians = $scope.repPoliticians.filter((i) => i !== repPolitician);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateDemPolitician = function(demPolitician) {
    $http.put('http://localhost:5000/api/demPoliticians/' + demPolitician._id, demPolitician)
      .then((res) => {
        $scope.demPoliticians[$scope.demPoliticians.indexOf(demPolitician)] = demPolitician;
        demPolitician.editing = false;
      }, (err) => {
        console.log(err);
        demPolitician.editing = false;
      });
  };

  $scope.updateRepPolitician = function(repPolitician) {
    $http.put('http://localhost:5000/api/repPoliticians/' + repPolitician._id, repPolitician)
      .then((res) => {
        $scope.repPoliticians[$scope.repPoliticians.indexOf(repPolitician)] = repPolitician;
        repPolitician.editing = false;
      }, (err) => {
        console.log(err);
        repPolitician.editing = false;
      });
  };

}]);

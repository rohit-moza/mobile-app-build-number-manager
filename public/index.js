angular.module('angularApp', []).controller('indexCtrl', function($scope, $http, $httpParamSerializer) {
  $scope.returnedReadBuildNumber = null;
  $scope.err = null;
  $scope.status = null;
  $scope.serverMessage = null;
  $scope.readBundleId = null;
  $scope.setBundleId = null;
  $scope.bumpBundleId = null;

  $scope.validateRequestFormat = function(reqBundleId) {
    let regex = /^(com)+(\.\w+){2}$/g;
    let found = reqBundleId.match(regex);
    if(!found) {
      $scope.err = 'Invalid Request format. The Valid format is: com.[COMPANY].[APP-NAME] e.g.com.sagomini.HomeworkChallenge'
      return false;
    }
    return true;
  }


  $scope.readBuildNumber = function() {
    $http({method: 'GET', url: `/api/read?bundle_id=${$scope.readBundleId}`}).
      then(function(res) {
        $scope.returnedReadBuildNumber = res.data.build_number;
        $scope.err = res.data.err;
        $scope.status = res.data.success;
      }, function(res) {
        // IF ERROR
    });
  }

  
  $scope.setBuildNumber = function() {
    $http.post("/api/set", {'bundle_id': $scope.setBundleId}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            return response;
    });
  }

   $scope.bumpBuildNumber = function() {
    $http({method: 'POST', url: '/api/set'}).
      then(function(res) {
        $scope.returnedReadBuildNumber = res.data.build_number;
        $scope.err = res.data.err;
        $scope.status = res.data.success;
      }, function(res) {
        // IF ERROR
    });
  }







})
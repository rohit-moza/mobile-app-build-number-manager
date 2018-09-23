angular.module('angularApp', []).controller('indexCtrl', function($scope, $http, $httpParamSerializer) {
  $scope.returnedReadBuildNumber = null;
  $scope.err = null;
  $scope.status = null;
  $scope.serverMessage = null;
  $scope.readBundleId = null;
  $scope.setBundleId = null;
  $scope.setNewBuildNumber = null;
  $scope.bumpBundleId = null;
  $scope.msg = null;

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
        $scope.err = res.data.err;
        $scope.status = res.data.success;
        $scope.msg = res.data.msg;
      }, function(res) {
        // IF ERROR
    });
  }

  
  $scope.setBuildNumber = function() {
    $http.post("/api/set", {'bundle_id': $scope.setBundleId, 'build_number': $scope.setNewBuildNumber}, {headers: {'Content-Type': 'application/json'} })
        .then(function (res) {
          $scope.returnedReadBuildNumber = res.data.build_number;
          $scope.err = res.data.err;
          $scope.status = res.data.success;
          $scope.msg = res.data.msg;
        });
  }

   $scope.bumpBuildNumber = function() {
    $http.post("/api/bump", {'bundle_id': $scope.bumpBundleId}, {headers: {'Content-Type': 'application/json'} })
        .then(function (res) {
          $scope.err = res.data.err;
          $scope.status = res.data.success;
          $scope.msg = res.data.msg;
        });
    }


})
angular.module('angularApp', []).controller('indexCtrl', function($scope, $http) {
  $scope.returnedReadBuildNumber = null;
  $scope.err = null;
  $scope.status = null;
  $scope.serverMessage = null;
  $scope.readBundleId = null;



  $scope.readBuildNumber = function() {
      // READ
    $http({method: 'GET', url: `/api/read?bundle_id=${$scope.readBundleId}`}).
      then(function(res) {
        $scope.returnedReadBuildNumber = res.data.build_number;
        $scope.err = res.data.err;
        $scope.status = res.data.success;
      }, function(res) {
        // IT ERROR
    });
  }



  //

})
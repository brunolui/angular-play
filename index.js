var redditList = angular.module('redditList', []);

redditList.controller('redditController', function($scope, Reddit) { 
	$scope.title = "Reddit Posts"
	
	Reddit.get(function(posts){
	    $scope.posts = posts.data.children;
	});
	

});

redditList.factory("Reddit", function($http){
  return {
    get: function(callback) {
      return $http.get("http://www.reddit.com/.json").success(callback);
    }
  }
});
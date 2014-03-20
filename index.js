var redditList = angular.module('redditList', ['ui.bootstrap']);

redditList.controller('redditController', function($scope, Reddit) { 

	$scope.title = "Reddit Posts";
	$scope.favorites = [];
	
	Reddit.get(function(posts){
	    $scope.posts = posts.data.children;
	});

	$scope.favoritar = function(post) {
		$scope.favorites.push(post);
	};
	
	$scope.desfavoritar = function(post) {
		$scope.favorites.pop(post);
	};
});

redditList.factory("Reddit", function($http){
  return {
    get: function(callback) {
      return $http.get("http://www.reddit.com/.json").success(callback);
    }
  }
});

redditList.directive("lookPost", function($modal) {
  return {
    restrict: "E",
    scope: {
      postagem: "="
    },
    template: '<img src="{{postagem.data.thumbnail}}" ng-click="abrePost()"></img>',
    link: function(scope, element, attr) {

      scope.abrePost = function() {
          var modalInstance = $modal.open({
            templateUrl: 'modal.html',
            resolve: {
              post: function(){ return scope.postagem; }
            }
          });

      };
    }
  }
});
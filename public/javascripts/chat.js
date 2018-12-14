var app = angular.module('chatApp', ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/list", {
    templateUrl : "list.html",
	controller: "getMessagesController"
  })
  .when("/send", {
    templateUrl : "send.html",
	controller : "sendMessageController"
  })
});

app.controller('sendMessageController', function($scope, $http, $location){
	
	$scope.sendMessage = function(){
		
		var data = {
			name: $scope.name,
			message: $scope.message
		};
		
		$http.post('/messages', data).then(function (response) {
			
			console.log(response.data);
			
			$location.path("/list");
					
		}, function(error){
			console.log(error);
		});	
	};
		
});

app.controller('getMessagesController', function($scope, $http){
	
	$scope.getMessages = function(){
		
		$http.get('/messages').then(function (response) {
			
			console.log(response.data);
			
			$scope.messages = response.data;
			
		}, function(error){
			console.log(error);
		});	
	};
	
	$scope.delMessage = function(msg){
		
		var time = msg.time;
		
		$http.delete('/messages?time=' + time).then(function (response) {
			
			console.log(response.data);
			
			$scope.messages = response.data;
			
		}, function(error){
			console.log(error);
		});	
		
	};
	
	$scope.getMessages();
});


'use strict';

describe('myApp module', function() {

  beforeEach(module('app'));

  describe('should have controller HomeCtrl', function() {

	var scope, HomeCtrl, httpBackend;

	beforeEach(inject(function($controller, $rootScope, $httpBackend) {
	  scope = $rootScope.$new();
	  HomeCtrl = $controller('HomeController', {$scope: scope});  
	  httpBackend = $httpBackend;
	}));

	it('should be defined $scope.comments', function() {
		expect(scope.comments).toBeDefined();
	});

	it('should be there are attributes in comments', function() {
		expect(scope.comments[0].title).toBeDefined();
		expect(scope.comments[0].description).toBeDefined();
		expect(scope.comments[0].tags).toBeDefined();
		expect(scope.comments[0].likes).toBeDefined();
		expect(scope.comments[0].comments).toBeDefined();
	});

	/*it('should have workerName and selectedRestaurant on try to vote', function() {
	  var selectedRestaurant = {
		workerName: 'laurindo',
		name: 'Gendai'
	  };
	  scope.vote(selectedRestaurant);
	  expect(selectedRestaurant.workerName).toBe('laurindo');
	  expect(selectedRestaurant.name).toBe('Gendai');
	});

	it('should there is list of restaurants', function() {
	  scope.restaurants = [];
	  httpBackend.whenGET('http://localhost:1234/api/restaurants').respond({
		restaurants: [{
				name: 'Gendai',
				description: '',
				typeFood: 'CHINESE'
		}]
	  });
	  scope.getRestaurants();

	  httpBackend.flush();

	  expect(scope.restaurants[0].name).toBe('Gendai');
	  expect(scope.restaurants.length).toBeGreaterThan(0);
	});*/

  });
});
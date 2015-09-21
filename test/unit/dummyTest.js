describe('todomvc testing', function() {
  beforeEach(module('todomvc'));

  describe('app function testing', function() {
    it('current version', inject(function(){}));
  });
});


describe('Service unit testing', function() {
  beforeEach(module('myApp.services'));

  describe('Version testing', function() {
    it('current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});


/* 컨트롤러 단위 테스트 */
describe('controllers unit test', function(){
  beforeEach(module('myApp.services'));
  var scope;
  it('MyCtrl1 controller test1', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    expect(scope.test1).toBe('EFG');
  }));
  
  /*controller('MyCtrl1', ['$scope', function($scope) {
  		$scope.test1 = 'EFG';
	}])*/
  
  
  it('MyCtrl2 controller test2', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl2', {
      $scope : scope
    });
    expect(scope.test2()).toBe('Hello!');
  }));

  it('setFirstAndRestSentence Dummy', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
  //  var results = scope.getFirstAndRestSentence("Hello? This is Sung");
   // expect(results[0]).toEqual('Hello?');
//	expect(results[1]).toEqual(' This is Sung');
	
	var res1 = scope.getFirstAndRestSentence("My name is Gary. I'm a student");
	expect(res1[0]).toEqual('My name is Gary.');
	
	var res2 = scope.getFirstAndRestSentence("My name is Gary");
	expect(res2[0]).toEqual('My name is Gary');
	
	var res3 = scope.getFirstAndRestSentence("My name is Gary?I'm a student. I love soccer");
	expect(res3[0]).toEqual('My name is Gary?');
	
	

  }));

});

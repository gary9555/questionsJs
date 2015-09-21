'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
     //   var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));

    describe('TodoCtrl Testing', function() {
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},
		  {str:"Hello.co! This! is! Sung", exp: "Hello.co!"},
          {str:"Hello?? This is Sung", exp: "Hello??"},
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });

      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });
	  
	 
	  // Watch Collection
	  it('$watchCollection',function() {
		var ctrl = controller('TodoCtrl', {
          $scope: scope
        });
	 
	 
	  });
	  
	  // add todo 
	/*  
	  it('addTodo',function() {
		var ctrl = controller('TodoCtrl', {
          $scope: scope,
		  $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });  
	 	
		scope.input.wholeMsg = "shuai";
		
	 	scope.addTodo();
		
	  });
	 */
	  
	  // edit todo
	  it('editTodo',function() {
		var ctrl = controller('TodoCtrl', {
          $scope: scope
        });  
	 	
		var input="cool";
		scope.editTodo(input);
	 	expect(scope.editedTodo).toBe(input);
	//	expect(scope.originalTodo).toBe(["cool"]);
	  });
	  
	  
	  // add echo
	  it('addEcho',function() {
		var ctrl = controller('TodoCtrl', {
          $scope: scope
        });  
		
		var td = {
			wholeMsg: "shuai",
			head: "shuai",
			headLastChar: 'i',
			desc: "hi",
		//	linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.addEcho(td);
		
		
	 	expect(td.echo).toBe(1);
		expect(td.order).toBe(-1);
		expect(scope.$storage[td.$id]).toBe("echoed");
	  });

	  // done editing
	  it('doneEditing',function() {
		var ctrl = controller('TodoCtrl', {
          $scope: scope
        });  
		
		var td1 = {
			wholeMsg: "shuai",
			head: "shuai",
			headLastChar: 'i',
			desc: "hi",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
		var td2 = {
			wholeMsg: "",
			head: "shuai",
			headLastChar: 'i',
			desc: "hi",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
	 	
		scope.doneEditing(td1);
		scope.doneEditing(td2);
		
	 	//expect(scope.editedTodo).toBe(input);
	
	  });
		
		// clear completed todos
	   it('clearCompletedTodos',function() {
		var ctrl = controller('TodoCtrl', {
          $scope: scope
        });  
		
		var td1 = {
			wholeMsg: "shuai",
			head: "shuai",
			headLastChar: 'i',
			desc: "hi",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
		var td2 = {
			wholeMsg: "",
			head: "shuai",
			headLastChar: 'i',
			desc: "hi",
			completed: true,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
		
		
	 	scope.clearCompletedTodos();
		
		
	 	//expect(scope.editedTodo).toBe(input);
	
	  });



      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });
    });
  });
  
  
describe('Unit testing directives', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('todomvc'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  
  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<a-great-eye></a-great-eye>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });
});

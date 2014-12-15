(function(){
	var module = angular.module("todoMod",[]);
	module.run(function() {
	    AV.initialize("z4rhbxssw9x05u39kfsg13le4k9pz9az8uijpu4ohzkf56bc", "571x96ue9q2wbaxb2cnhnwm1bes13h6rw4w2cyhbyj5s076e");
	});
	module.controller("todoCtrl",['$http', '$scope',
	 function($http, $scope){
	  $scope.todos = [];
	  $scope.newTodo = {text:"", done: false};


	  $scope.getTodos = function() {
	  	var Todo = AV.Object.extend("Todo");
	  	var query = new AV.Query(Todo);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.todos = JSON.parse(JSON.stringify(results));;
	  			})
	  		}
	  	})
	  }


	  $scope.addTodo = function () {
	  	var Todo = AV.Object.extend("Todo");
	  	var todo = new Todo();
	  	todo.set("text",$scope.newTodo.text);
	  	todo.set("done",$scope.newTodo.done);
	  	var todoFile = document.getElementById("todoFile");
	  	console.log('todoFile', todoFile);
		if (todoFile.files.length > 0) {
		  var file = todoFile.files[0];
		  var name = file.name;

		  var avFile = new AV.File(name, file);
		  console.log('avFile:', avFile);
		  avFile.save().then(function(result) {
			  $scope.$apply(function(){
			  	console.log('upload file result:', result);
		  		todo.set('image_file', avFile);
		  		todo.set('image_url', result.url());
  				_save(todo);
	  		  });
			}, function(error) {
			  console.log('error:', error);
			});
		} else {
			_save(todo);
		}
	  	
	  };

	  var _save = function(todo) {
	  	todo.save(null, {
	  		success: function(result){
	  			$scope.$apply(function(){
	  				$scope.todos.push(todo.toJSON());
	  				$scope.newTodo = {text:"", done: false};
	  			});
	  		}
	  	});		
	  }
	  $scope.updateTodoState = function(todoParam) {
	  	var Todo = AV.Object.extend("Todo");
	  	var todo = new Todo();
	  	todo.set("objectId",todoParam.objectId);
	  	todo.set("done",todoParam.done);
	  	todo.save(null, {
	  		success: function(result){
	  		}
	  	});
	  }

    $scope.getTodos();

	}]);



})();
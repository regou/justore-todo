
var objectAssign = require('object-assign');
var justore = require('justore');


var TodoStore = new justore({
  'todos': {
	  '1':{id:1,text:'get some cookies',complete:false},
	  '2':{id:2,text:'eat them',complete:false}
  },
	'hoverTarget':null
});


TodoStore.getTodos = function(){
	return objectAssign({},TodoStore.read('todos'));
};

TodoStore.clearCompleted = function(){
	var todos = TodoStore.getTodos();
	for(key in todos){
		if(todos[key].complete){
			delete todos[key];
		}
	}
	TodoStore.write('todos',todos);
};

TodoStore.deleteTodo = function(id){
	var newTodos = TodoStore.getTodos();
	delete newTodos[id];
	TodoStore.write('todos',newTodos);
};

TodoStore.updateTodo = function(id,text){
	TodoStore.update(`todos.${id}.text`,text);
};

TodoStore.toggleComplete = function(id){
	var todos = TodoStore.getTodos();
	TodoStore.update(`todos.${id}.complete`,!todos[id].complete);
};




module.exports = TodoStore;

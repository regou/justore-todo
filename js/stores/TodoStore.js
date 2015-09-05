

var justore = require('justore');


var TodoStore = new justore({
  'todos': {
	  '1':{id:1,text:'get some cookies',complete:false},
	  '2':{id:2,text:'eat them',complete:false}
  },
	'hoverTarget':null
});


TodoStore.getTodos = function(){
	return Object.assign({},TodoStore.read('todos'));
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




module.exports = TodoStore;

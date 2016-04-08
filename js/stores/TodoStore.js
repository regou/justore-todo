
var objectAssign = require('object-assign');
var justore = require('justore');

import React, {Component} from 'react';
import {observable,computed} from 'mobx';
import {observer} from 'mobx-react';


class ObservableTodoStore {
	@observable todos = [
		{id:1,text:'get some cookies',complete:false},
		{id:2,text:'eat them',complete:false}
	];
	@computed get unfinishedTodoCount() {
		return this.todos.filter(todo => !todo.complete).length;
	}
	@computed get finishedTodoCount() {
		return this.todos.filter(todo => todo.complete).length;
	}

	del(todo){
		this.todos = this.todos.filter((item)=>item != todo);
	}

	clearCompleted(){
		this.todos = this.todos.filter((item)=>!item.complete);
	}

}





module.exports = new ObservableTodoStore();

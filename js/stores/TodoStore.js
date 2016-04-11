import React, {Component} from 'react';
import {observable,computed} from 'mobx';
import {observer} from 'mobx-react';


class ObservableTodoStore {
	@observable todos = [
		{id: 1, text: 'get some cookies', complete: false,time:new Date(1460120705075)},
		{id: 2, text: 'eat them', complete: false,time:new Date(1460121705375)}
	];

	// @computed get unfinishedTodoCount() {
	// 	return this.todos.filter(todo => !todo.complete).length;
	// }
	get unfinishedTodoCount() {
		return this.todos.filter(todo => !todo.complete).length;
	}

	// @computed get finishedTodoCount() {
	// 	return this.todos.filter(todo => todo.complete).length;
	// }

	get finishedTodoCount() {
		return this.todos.filter(todo => todo.complete).length;
	}

	add(todo) {
		this.todos.push(todo);
	}

	del(todo) {
		this.todos = this.todos.filter((item)=>item != todo);
	}


	clearCompleted() {
		this.todos = this.todos.filter((item)=>!item.complete);
	}

}


module.exports = new ObservableTodoStore();

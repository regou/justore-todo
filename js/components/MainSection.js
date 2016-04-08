/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {Component} from 'react';
import {observer} from "mobx-react";
var ReactPropTypes = React.PropTypes;

var TodoItem = require('./TodoItem.js');
var TodoStore = require('../stores/TodoStore');


@observer
class MainSection extends Component {
	render() {
		// This section should be hidden by default
		// and shown when there are todos.

		if (TodoStore.todos.length < 1) {
			return null;
		}


		var areAllComplete = TodoStore.unfinishedTodoCount <= 0;

		var todos = [];
		TodoStore.todos.forEach(function(todo,idx){
			todos.push(<TodoItem key={todo.id} todo={todo} />);
		});

		return (
			<section id="main">
				<input
					id="toggle-all"
					type="checkbox"
					onChange={this._onToggleCompleteAll.bind(this,areAllComplete)}
					checked={areAllComplete ? 'checked' : ''}
				/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul id="todo-list">{todos}</ul>
			</section>
		);
	}


	  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll(areAllComplete) {
    TodoStore.todos.forEach(function(todo,idx){
		todo.complete = !areAllComplete;
	})

  }

}
//
// var MainSection = React.createClass({
//   getInitialState:function(){
//     return getTodoState();
//   },
//   onStoreChange: function() {
//     this.setState(getTodoState());
//   },
// 	getAreAllComplete:function(){
// 		var allTodos = this.state.allTodos;
// 		var areAllComplete = true;
// 		for(id in allTodos){
// 			if(!allTodos[id].complete){
// 				areAllComplete = false;
// 				break;
// 			}
// 		}
// 		return areAllComplete;
//
// 	},
//   render: function() {
//     // This section should be hidden by default
//     // and shown when there are todos.
//     if (Object.keys(this.state.allTodos).length < 1) {
//       return null;
//     }
//
//     var allTodos = this.state.allTodos;
//     var todos = [];
//
// 	var areAllComplete = this.getAreAllComplete();
//
// 	  Object.keys(allTodos).forEach(function(id){
// 		  todos.push(<TodoItem key={id} todo={allTodos[id]} />);
// 	  });
//
//     return (
//       <section id="main">
//         <input
//           id="toggle-all"
//           type="checkbox"
//           onChange={this._onToggleCompleteAll.bind(this,areAllComplete)}
//           checked={areAllComplete ? 'checked' : ''}
//         />
//         <label htmlFor="toggle-all">Mark all as complete</label>
//         <ul id="todo-list">{todos}</ul>
//       </section>
//     );
//   },
//
//   /**
//    * Event handler to mark all TODOs as complete
//    */
//   _onToggleCompleteAll: function(areAllComplete) {
//
//     var todos = TodoStore.getTodos();
//     Object.keys(todos).forEach(function(id){
// 		todos[id].complete = !areAllComplete;
// 	})
//
//     TodoStore.write('todos',todos);
//   }
//
// });

module.exports = MainSection;

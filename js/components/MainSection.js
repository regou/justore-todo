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

		var todos = TodoStore.todos.map(function (todo, idx) {
			return (<TodoItem key={todo.id} todo={todo}/>);
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
		TodoStore.todos.forEach(function (todo, idx) {
			todo.complete = !areAllComplete;
		})

	}

}


module.exports = MainSection;

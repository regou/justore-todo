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

var TodoTextInput = require('./TodoTextInput.js');
var TodoStore = require('../stores/TodoStore');

import DevTools from 'mobx-react-devtools';

var classNames = require('classnames');


class TodoItem extends Component {
	static defaultProps = {}
	static propTypes = {
		todo: ReactPropTypes.object.isRequired
	}

	state = {
		isEditing: false
	}

	constructor(props) {
		super(props);
	}

	_onDoubleClick() {
		this.setState({isEditing: true});
	}

	_onToggleComplete() {
		this.props.todo.complete = !!!this.props.todo.complete
	}

	_onSave(text) {
		this.props.todo.text = text;
		this.props.todo.time = new Date();
		this.setState({isEditing: false});
	}

	_onDestroyClick() {
		TodoStore.del(this.props.todo);
	}


	render() {
		var todo = this.props.todo;
		return (
			<li title={todo.time.toLocaleTimeString()} className={classNames({'completed': todo.complete,'editing': this.state.isEditing})}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.complete}
						onChange={()=>this._onToggleComplete()}
					/>
					<label onDoubleClick={()=>this._onDoubleClick()}>
						{todo.text}
					</label>
					<button className="destroy" onClick={()=>this._onDestroyClick()}/>
				</div>
				{this.state.isEditing ?
					<TodoTextInput onSave={this._onSave.bind(this)} className="edit" value={todo.text}/> : null}
				<DevTools/>
			</li>
		);
	}
}


module.exports = TodoItem;

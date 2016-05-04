/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var TodoTextInput = require('./TodoTextInput.js');
var TodoStore = require('../stores/TodoStore');

var classNames = require('classnames');

var TodoItem = React.createClass({

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },
  render: function() {
    var todo = this.props.todo;
    return (
      <li className={classNames({'completed': todo.complete,'editing': this.state.isEditing})} key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
		  {this.state.isEditing ? <TodoTextInput onSave={this._onSave} className="edit" value={todo.text}/>:null}
      </li>
    );
  },

  _onToggleComplete: function() {

	  var todoId = this.props.todo.id;
	  TodoStore.toggleComplete(todoId);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
	  var todoId = this.props.todo.id;
	  TodoStore.updateTodo(todoId,text);
	  this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
	  var id = this.props.todo.id;
	  TodoStore.deleteTodo(id);
  }

});

module.exports = TodoItem;

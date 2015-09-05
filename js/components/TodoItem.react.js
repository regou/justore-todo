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

var TodoTextInput = require('./TodoTextInput.react');
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

  /**
   * @return {object}
   */
  render: function() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
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
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {

	  var todoId = this.props.todo.id;

    TodoStore.write('todos',todoId, {
		  waitFor:function(id){
            return new Promise(function(res){
              var todos = Object.assign({},TodoStore.read('todos'));
              todos[id].complete = !todos[id].complete;
              res(todos);
            });

		  }
	  });
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
	  TodoStore.write('todos',todoId, {
		  waitFor:function(id){
			  return new Promise(function(res){
				  var todos = Object.assign({},TodoStore.read('todos'));
				  todos[id].text = text;
				  res(todos);
			  });

		  }
	  });
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
	  var todoId = this.props.todo.id;
    TodoStore.write('todos',todoId, {
      waitFor:function(id){
        return new Promise(function(res){
          var todos = Object.assign({},TodoStore.read('todos'));
			delete todos[id];
          res(todos);
        });

      }
    });
  }

});

module.exports = TodoItem;

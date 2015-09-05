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

var TodoItem = require('./TodoItem.react');
var TodoStore = require('../stores/TodoStore');


function getTodoState() {
  return {
    allTodos: TodoStore.read('todos')
  };
}


var MainSection = React.createClass({

  getInitialState:function(){
    return getTodoState();
  },
  componentWillMount: function(){
    var comp = this;
    TodoStore.change.on('todos',comp._onChange)
  },
  componentWillUnmount:function(){
    var comp = this;
    TodoStore.change.removeListener('todos',comp._onChange)
  },
  _onChange: function() {
    this.setState(getTodoState());
  },
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.state.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.state.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;

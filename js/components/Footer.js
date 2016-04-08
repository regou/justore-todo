/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {Component} from 'react';
var ReactPropTypes = React.PropTypes;
var TodoStore = require('../stores/TodoStore');
import {observer} from 'mobx-react';


@observer
class Footer extends Component {
  render() {
    var total = TodoStore.todos.length;

    if (total === 0) {
      return null;
    }



    var itemsLeft = TodoStore.unfinishedTodoCount;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (TodoStore.finishedTodoCount) {
      clearCompletedButton =
          <button
              id="clear-completed"
              onClick={this._onClearCompletedClick}>
            Clear completed ({TodoStore.finishedTodoCount})
          </button>;
    }

    return (
        <footer id="footer">
          <span id="todo-count">
            <strong>
              {itemsLeft}
            </strong>
            {itemsLeftPhrase}
          </span>
          {clearCompletedButton}
        </footer>
    );
  }

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick() {
    TodoStore.clearCompleted();
  }
}


module.exports = Footer;

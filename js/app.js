/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

var TodoApp = require('./components/TodoApp.js');

React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);


if(Raven) {
  Raven.config('https://df02024c03e94e5e820bd69970c3c8aa@app.getsentry.com/56684').install();
  function logException(ex, context) {
    Raven.captureException(ex, {
      extra: context
    });
  }

  if(window.console && console.error){
    console.error = logException;
  };

  window.onerror = function (message, file, line, column, errorObj) {
    if (errorObj !== undefined) {
      logException(errorObj, {'where': 'internal'});
    } else {
      logException(message, {'where': 'internal'});
    }
  }
}
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var justore = require('justore');


var TodoStore = new justore({
  'todos': {
	  '1':{id:1,text:'get some cookies',complete:false},
	  '2':{id:2,text:'eat them',complete:false}
  }
});




module.exports = TodoStore;

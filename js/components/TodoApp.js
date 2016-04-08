/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */


var Header = require('./Header.js');
var MainSection = require('./MainSection.js');
var Footer = require('./Footer.js');
var React = require('react');




var TodoApp = React.createClass({

	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<div>
				<Header />
				<MainSection/>
				<Footer/>

			</div>
		);
	}

});

module.exports = TodoApp;

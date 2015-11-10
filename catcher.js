function loadJS(src, callback) {
	var script = document.createElement('script'),
		loaded;
	script.setAttribute('src', src);
	script.setAttribute('async', true);
	if (callback) {
		script.onreadystatechange = script.onload = function() {
			if (!loaded) {
				callback();
			}
			loaded = true;
		};
	}
	document.getElementsByTagName('head')[0].appendChild(script);
}

loadJS("js/lib/raven.min.js", function() {
	if(Raven) {
		Raven.config('https://2ca5c9fc49a24072a962d85f51f3f924@app.getsentry.com/57824').install();

		Raven.setRelease('0.0.3');

		function logException(ex, context) {
			Raven.captureException(ex, {
				extra: context
			});
		}
		function logInfo(str){
			Raven.captureMessage(str);
		}

		if(window.console && console.error){
			console.error = logException;
		};
		if(window.console && console.info){
			console.info = logInfo;
		};

		window.onerror = function (message, file, line, column, errorObj) {
			if (errorObj !== undefined) {
				logException(errorObj, {'where': 'global'});
			} else {
				logException(message, {'where': 'global'});
			}
		}
	}

});
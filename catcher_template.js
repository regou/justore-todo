(function(global){

	var clientApiUrl = "${clientApiUrl}";
	var releaseVersion = "${releaseVersion}";

	function loadJS(src, callback) {
		var script = document.createElement('script'),
			loaded;
		script.setAttribute('src', src);
		script.setAttribute('async', '');
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

	loadJS("js/lib/raven_patsnap.js", function() {
		if(Raven) {
			Raven.config(clientApiUrl).install();

			Raven.setRelease(releaseVersion);

			Raven.setUserContext({
				email: 'matt@example.com',//user
				id: '123'//request-id
			});

			function logException(ex, context) {
				var opt = {};
				context ? opt.extra = context : opt.extra = {'where':'internal'};
				Raven.captureException(ex, opt);
				console.log(ex);
			}

			if(window.console && console.error){
				console.error = logException;
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

})(window);


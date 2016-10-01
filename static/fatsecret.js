
var fatsecret = {
	variables: {

		rootUrl: 'https://platform.fatsecret.com/js/Default.aspx?pg=',

		splitter: 'fs_644b7850b71d4710bdde66e7a4d66c80',
		key: '1093cde450ac4ac38355bacf7daea2d9',
		appTitle: 'My Diet',
		navOptions: 31,

		autoLoad: true,
		autoTemplate: true,
		showLoading: true

	},

	setCookie: function(name, value){
		var date = new Date();
		date.setTime(date.getTime()+(10*365*24*60*60*1000));
		document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString() + ';path=/';
	},

	doWrite: function(url, isCss){
		var h = isCss ? '<link type="text/css" rel="stylesheet"' : '<script type="text/javascript"';
		h += (isCss ? ' href' : ' src') + '="' + url;
		h += isCss ? '"/>' : '"></script>';
		document.write(h);
	},

	start: function(){
		this.doWrite('https://platform.fatsecret.com/js/static/css/all.css', true);


			this.doWrite('https://platform.fatsecret.com/js/static/css/themes/blue.css', true);
		this.doWrite('https://platform.fatsecret.com/js/static/css/loading.css', true);

		this.doWrite('https://platform.fatsecret.com/js/static/script/final.js');





	}
};
fatsecret.start();


	document.write('<div class="fatsecret_container" id="fatsecret_container"></div>');

	document.write('<div id="fatsecret_loading" class="fatsecret_loading_invisible"><p>Loading...</p></div>');

var defaultGarbage = ['radar']; //Initialize with default values.
var garbage;

chrome.extension.sendRequest({localStorage: "garbage"}, function(response) {
  savedGarbage = response.garbage;
	if (savedGarbage == undefined) {
		garbage = defaultGarbage;
	} else {
		garbage = JSON.parse(savedGarbage);
	}
  setInterval(purge,200);
});

function purge() {
  for (trash in garbage) {
    var dashboard_nav_titles = document.getElementsByClassName(garbage[trash].toLowerCase());
  	for (var i=0;i<dashboard_nav_titles.length;i++) {
			if (dashboard_nav_titles[i].innerHTML.toLowerCase().indexOf(garbage[trash].toLowerCase()) >= 0) {
				evilness = dashboard_nav_titles[i];
				evilness.parentNode.removeChild(evilness);
			}
		}
	}
}

var better_rule = '.source_url {display:none!important;}';

try {
  document.styleSheets[0].insertRule(better_rule, 0);
} catch (e) {
  addGlobalStyle(better_rule);
}
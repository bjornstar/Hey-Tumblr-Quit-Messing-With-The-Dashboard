var defaultGarbage = ['Radar','Recommended','Iconic']; //Initialize with default values.
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

var last_nav_title=0;
var dashboard_nav_titles = document.getElementsByClassName('dashboard_nav_title');

function purge() {
	for (var i=0;i<dashboard_nav_titles.length;i++) {
		for (trash in garbage) {
			if (dashboard_nav_titles[i].innerHTML.indexOf(garbage[trash]) >= 0) {
				evilness = dashboard_nav_titles[i].parentNode
				evilness.parentNode.removeChild(evilness);
			}
		}
	}
}
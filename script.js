var defaultGarbage = ['radar','recommended','promo']; //Initialize with default values.
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
var dashboard_nav_titles = document.getElementsByClassName('dashboard_nav_item');

function purge() {
	for (var i=0;i<dashboard_nav_titles.length;i++) {
		for (trash in garbage) {
			if (dashboard_nav_titles[i].innerHTML.toLowerCase().indexOf(garbage[trash].toLowerCase()) >= 0) {
				evilness = dashboard_nav_titles[i];
				evilness.parentNode.removeChild(evilness);
			}
		}
	}
}
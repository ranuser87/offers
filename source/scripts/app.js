window.$ = window.jQuery = require("jquery");
let BreakpointsObserver = require("./breakpointsObserver").default;
window.breakpointsObserver = new BreakpointsObserver().init();
import Offers from "./offers";

$(".js-offers").each((index, node)=>{
	new Offers({
		$parentNode: $(node),
		cellsSelector: ".js-offers-cell",
		detailsSelector: ".js-offers-details",
		contentSelector: ".js-offers-content",
		activityMarker: "offers__unit_active",
		animationSpeed: 300
	}).init();
});


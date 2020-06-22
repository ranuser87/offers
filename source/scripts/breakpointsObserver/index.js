import Observer from "../observer";

/*
	@constructor
	@classdesc - singletone that calls subscribers every time when media-breakpoint changes
*/
class BreakpointsObserver extends Observer {
	constructor() {
		super();
		this._body;
		this._currentBreakpoint;
		this._alreadyInit = false;
		this._eventName = "breakpointChange";
		this.watchForBreakpoints = this.watchForBreakpoints.bind(this);
	}

	/*
		@description - pass user callback to Observer.subscribe
		@param {function} subscriber
	*/
	subscribe(subscriber) {
		Observer.prototype.subscribe.call(this, {
			eventName: this._eventName,
			action: subscriber
		});
	}

	/*
		@see {@link https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript}
		@description - retrieves value from body:before{content: value}
	*/
	_getCurrentBreakpoint() {
		return window.getComputedStyle(this._body, ":before").getPropertyValue("content").replace(/\"/g, '');
	}

	/*
		@description - compare previous breakpoint and current breakpoint
	*/
	watchForBreakpoints() {
		let newBreakpoint = this._getCurrentBreakpoint();
		if(newBreakpoint !== this._currentBreakpoint) {
			this.publish(this._eventName, {
				prevBreakpoint: this._currentBreakpoint,
				currentBreakpoint: newBreakpoint	
			});
			this._currentBreakpoint = newBreakpoint;
		}
	}

	/*
		@description - detects whether class instance can be initiated
	*/
	_canRun() {
		return !this._alreadyInit && this._currentBreakpoint !== "none";	
	}

	/*
		@description - initiation
		@returns {object} this
	*/
	init() {
		this._body = document.body;
		this._currentBreakpoint = this._getCurrentBreakpoint();

		if(this._canRun()) {
			window.addEventListener("resize", this.watchForBreakpoints);
			this._alreadyInit = true;			
		}

		return this;
	}
}

export default BreakpointsObserver;
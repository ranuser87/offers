/*
	@constructor
	@classdesc - compilation of ideas by bdeglane (https://github.com/bdeglane/simple-es6-observer/blob/master/app/observer/Observable.js)
	and Komock (https://gist.github.com/Komock/f8b3be2de6f81ac86047a98cee828652)
*/
class Observer {
	constructor() {
		this.subscribers = [];	
	}

	/*
		@description - add subscriber to collection.
		@param {object} subscriber
		@param {string} subscriber.eventName
		@param {function} subscriber.action
	*/
	subscribe(subscriber) {
		this.subscribers.push(subscriber);
	}
	
	/*
		@description - remove subscriber from collection
		@param {string} eventName
	*/
	unsubscribe(eventName) {
		this.subscribers = this.subscribers.filter((subscriber)=>{
			return subscriber.eventName !== eventName;
		});
	}

	/*
		@description - call all subscribers that match eventName
		@param {string} eventName
		@param {object} data - params to be passed to subscriber.action
	*/
	publish(eventName, data) {
		let targetSubscribers = this.subscribers.filter((subscriber)=>{
			return subscriber.eventName === eventName;
		});
		targetSubscribers.forEach((subscriber)=>{
			subscriber.action(data);
		});
	}
}

export default Observer;
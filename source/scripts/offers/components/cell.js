/*
	@constructor
	@classdesc - represents standalone cell
*/
class Cell {

	/*
		@constructs
		@param {object} options
		@param {object} $node - cell node, wrapped in jquery
		@param {string} options.activityMarker - css-class, representing cell active state
		@param {string} options.contentSelector - selector of content, hidden inside cell
		@param {object} options.parentRow
	*/
	constructor(options) {
		this._$node = options.$node;
		this._node = options.$node.get(0);
		this._node._cellInstance = this;
		this._activityMarker = options.activityMarker;
		this._contentSelector = options.contentSelector;
		this._parentRow = options.parentRow;
		this._$content;
	}

	/*
		@return {object}
	*/	
	getParentRow() {
		return this._parentRow;	
	}

	/*
		@descripition - return cell node, wrapped in jquery
		@return {object}
	*/
	get$() {
		return this._$node;
	}

	/*
		@descripition - return cell node
		@return {object}
	*/
	getNode() {
		return this._node;
	}

	/*
		@descripition - returns hidden content
		@return {object}
	*/
	getContent() {
		if(!this._$content) {
			this._$content = this._$node.find(this._contentSelector);
		}
		return this._$content.clone(); 
	}

	/*
		@description - set active look
	*/
	activate() {
		this._$node.addClass(this._activityMarker);
	}

	/*
		@description - remove active look
	*/
	deactivate() {
		this._$node.removeClass(this._activityMarker);	
	}
}

export default Cell;
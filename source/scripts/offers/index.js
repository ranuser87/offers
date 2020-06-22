import RowsCollection from "./components/rowsCollection.js";
import Details from "./components/details.js";

/*	
	@constructor
	@classdesc - create widget, consisting from cells (class Item), rows (class Row)
	and block for additional information (class Detail)
*/
class Offers {

	/*
		@constructs
		@param {object} options
		@param {object} options.$parentNode - parent element, element wrapped in jquery
		@param {string} options.cellsSelector - cells selector
		@param {string} options.detailsSelector - selector for block with additional information
		@param {string} options.contentSelector - selector of content, hidden inside cell
		@param {string} options.activityMarker - css-class, representing cell active state
		@param {number} options.animationSpeed - animation speed for block with additional information
	*/
	constructor(options) {
		this._$parentNode = options.$parentNode;
		this._cellsSelector = options.cellsSelector;
		this._options = options;
		this._activeCell;
		this._isInited = false;
		this._rebuildRowsCollection = this._rebuildRowsCollection.bind(this);
	}

	/*
		@description - turn off an cell, activated earlier
		@param {number} animationSpeed - deactivation speed
	*/
	_disableActivity(animationSpeed) {
		this._activeCell.deactivate();
		this._details.deactivate(animationSpeed);
		this._activeCell = undefined;
	}

	/*
		@description - activate new cell
		@param {object} targetCell - cell that user interacts with
		@param {number} animationSpeed - activation speed
	*/
	_enableActivity(targetCell, animationSpeed) {
		let content = targetCell.getContent();
		let parentRow = targetCell.getParentRow();
		let lastCellInRow = parentRow.getLastCell().get$();
		this._details.activate(lastCellInRow, content, animationSpeed);
		targetCell.activate();
		this._activeCell = targetCell;
	}

	/*
		@description - deactivate previous element and activates new
		@param {object} targetCell - cell that user interacts with
		@param {number} disablingSpeed - deactivation speed
		@param {number} activatingSpeed - activation speed
	*/
	_switchActivity(targetCell, disablingSpeed, activatingSpeed) {
		this._disableActivity(disablingSpeed);
		this._enableActivity(targetCell, activatingSpeed);
	}

	/*
		@description - default scenario implementation
		@param {object} targetCell - cell that user interacts with
	*/
	manageCellActivity(targetCell) {
		if(this._activeCell) {
			if(targetCell === this._activeCell) {
				this._disableActivity();
			} else {
				this._switchActivity(targetCell, 0);
			}
		} else {
			this._enableActivity(targetCell);
		}
	}

	/*
		@description - find instance of Cell by dom-ноде
		@param {object} node
	*/
	_findCellByNode(node) {
		return this._rowsCollection.findCellByNode(node);	
	}

	/*
		@description - rebuild structure, consisting of Cells and Rows
	*/
	_rebuildRowsCollection() {
		if(this._activeCell) {
			let activeCellNode = this._activeCell.getNode();
			this._disableActivity(0);
			this._rowsCollection = this._rowsCollection.init();
			let actualCell = this._rowsCollection.findCellByNode(activeCellNode);
			this._enableActivity(actualCell, 0);
		} else {
			this._rowsCollection = this._rowsCollection.init();
		}
	}

	/*
		@description - attach events
	*/
	_attachEvents() {
		if(!this._isInited) {
			this._$parentNode.on("click.field", this._cellsSelector, (e)=>{
				let targetCell = e.currentTarget._cellInstance;
				this.manageCellActivity(targetCell);
			});
	
			breakpointsObserver.subscribe(this._rebuildRowsCollection);
	
			this._isInited = true;
		}
	}

	/*
		@description - initiation
	*/
	init() {
		this._attachEvents();
		this._rowsCollection = new RowsCollection({
			$cells: this._$parentNode.find(this._cellsSelector),
			activityMarker: this._options.activityMarker,
			contentSelector: this._options.contentSelector
		}).init();
		this._details = new Details({
			$parentNode: this._$parentNode.find(this._options.detailsSelector),
			animationSpeed: this._options.animationSpeed
		});
	}
}

export default Offers;
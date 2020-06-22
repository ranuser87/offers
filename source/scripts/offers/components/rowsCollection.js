import Row from "./row.js";

/*
	@constructor
	@classdesc - unite multiple rows
*/
class RowsCollection {

	/*
		@constructs
		@param {object} options
		@param {object} options.$cells - jquery-collection, representing cells
		@param {string} options.activityMarker - css-class, representing cell active state
		@param {string} options.contentSelector - selector of content, hidden inside cell
	*/
	constructor(options) {
		this._$cells = options.$cells;
		this._options = options;
		this._rows;
	}

	/*
		@description - find Cell instance by dom-node
		@param {object} node
		@return {object}
	*/
	findCellByNode(node) {
		let cell;
		for(let i = 0; i < this._rows.length; i++) {
			let result = this._rows[i].findItemByNode(node);
			if(result) {
				cell = result;
				break;
			}
		}
		return cell;
	}

	/*
		@description - break items into rows
		@return {array} - rows collection
	*/
	init() {
		let rows = [];
		let prevCellTopPosition;

		this._$cells.each((index, node)=>{
			let $node = $(node);

			let nodeTopOffset = $(node).offset().top;

			if(prevCellTopPosition !== nodeTopOffset) {
				rows.push([$node]);
			} else {
				rows[rows.length - 1].push($node);
			}

			prevCellTopPosition = nodeTopOffset;
		});

		this._rows = rows.map((rowElements)=>{
			return new Row({
				$cells: rowElements,
				activityMarker: this._options.activityMarker,
				contentSelector: this._options.contentSelector
			});
		})

		return this;
	}
}

export default RowsCollection;
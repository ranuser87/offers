import 'core-js/modules/es6.array.find';
import Cell from "./cell.js";

/*
	@constructor
	@classdesc - unite cells into row
*/
class Row {

	/*
		@constructs
		@param {object} options
		@param {array} options.$cells - collection of cells, each of them wrapped in jquery
		@param {string} options.activityMarker - css-class, representing cell active state
		@param {string} options.contentSelector - selector of content, hidden inside cell
	*/
	constructor(options) {
		this._cells = options.$cells.map(($cell)=>{
			return new Cell({
				$node: $cell,
				activityMarker: options.activityMarker,
				contentSelector: options.contentSelector,
				parentRow: this
			})
		});
	}

	/*
		@description  - find Cell instance by dom-node
		@param {object} node
		@return {object}
	*/
	findItemByNode(node) {
		return this._cells.find((cell)=>{
			return cell.getNode() === node;
		});
	}

	/*
		@description - get las cell in row
		@returns {object}
	*/
	getLastCell() {
		return this._cells[this._cells.length - 1];
	}
}

export default Row;
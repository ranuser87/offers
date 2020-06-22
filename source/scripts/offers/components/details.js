/*
	@constructor
	@description - класс, описывающий блок, куда выводится дополнительная информация,
	извлеченная из ячейки
	@param {object} options
	@param {object} options.$parentNode - jquery-элемент, содержащий блок
	@param {number} options.animationSpeed - скорость анимации
*/
class Details {
	constructor(options) {
		this._$parentNode = options.$parentNode;
		this._animationSpeed = options.animationSpeed;
	}

	/*
		@description - показать блок
		@param {object} $targetNode - jquery-объект, после которого будет вставлен блок
		@param {object} $content - информация, которую должен отобразить блок
		@param {boolean} animationSpeed - скорость, с которой будет показан блок
	*/
	activate($targetNode, $content, animationSpeed) {
		let resultingAnimationSpeed = animationSpeed !== undefined ? animationSpeed : this._animationSpeed;
		this._$parentNode.empty();
		this._$parentNode.append($content);
		$targetNode.after(this._$parentNode);
		this._$parentNode.stop().slideDown(resultingAnimationSpeed, ()=>{
			this._$parentNode.css("height", "");	
		});	
	}

	/*
		@description - скрыть блок
		@param {boolean} animationSpeed - скорость, с которой будет скрыт блок
	*/
	deactivate(animationSpeed) {
		let resultingAnimationSpeed = animationSpeed !== undefined ? animationSpeed : this._animationSpeed;
		this._$parentNode.stop().slideUp(resultingAnimationSpeed);
	}
}

export default Details;
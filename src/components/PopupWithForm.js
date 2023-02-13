
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit.bind(this);
    this._container = this._popup.querySelector('.popup__container');
    this._input = this._container.querySelectorAll('.popup__input');
    // this._submitBtnText = this._submitBtn.textContent;
  };

  // setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //     // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
  //     input.value = data[input.name];
  //   });
  // }

  closePopup() {
    super.closePopup();
    this._container.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    this._input.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._handleSubmit(evt, this._getInputValues());
    });
  }

  // renderLoading (isLoading, loadingText = 'Сохранение...') {
  //   if (isLoading) {
  //     this._submitBtn.textContent = loadingText;
  //   } else {
  //    this._submitBtn.textContentt = this._submitBtnText;
  //   }
  // }

  // handleSubmit (request, evt, loadingText = 'Сохранение...') {
  //   evt.preventDefault();
  //   const submitButton = evt.submitter;
  //   const initialText = submitButton.textContent;
  //   this.renderLoading(true, submitButton, initialText, loadingText);
  //   request()
  //   .then(() => {
  //     evt.target.reset();
  //   })
  //   .catch((err) => {
  //     console.error(`Ошибка: ${err}`);
  //   })
  //   .finally(() => {
  //     this.renderLoading(false, submitButton, initialText);
  //   });
  // }
}
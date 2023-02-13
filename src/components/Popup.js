export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closePopupByEsc = this._closePopupByEsc.bind(this);
        this._closePopupByOverlay = this._closePopupByOverlay.bind(this);
    }
    openPopup() {
        this._popup.classList.add('popup_opened');
        window.addEventListener('keydown', this._closePopupByEsc);
        window.addEventListener('mousedown', this._closePopupByOverlay);
    }
    closePopup() {
        this._popup.classList.remove('popup_opened');
        window.removeEventListener('keydown', this._closePopupByEsc);
        window.removeEventListener('mousedown', this._closePopupByOverlay);
    }
    _closePopupByEsc(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }
    _closePopupByOverlay(evt) {
    if ((evt.target === this._popup)) {
        this.closePopup();
      }
    }
    
    setEventListeners() {
        this._popup.querySelector('.popup__button_making_exit').addEventListener('click', () => this.closePopup);
    }
}







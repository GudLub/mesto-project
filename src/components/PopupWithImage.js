import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor (selector, imageSelector, textSelector) {
    super(selector);
    this._image = this._popup.querySelector(imageSelector);    
    this._text = this._popup.querySelector(textSelector);
  }

  openPopup (src, text) {
    super.openPopup();
    this._image.src = src;
    this._image.alt = text;
    this._text.textContent = text;
  }
}
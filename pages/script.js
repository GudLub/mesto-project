const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elements = document.querySelector('.elements__list');
const elementImage = elements.querySelector('.element__image');
const elementTitle = elements.querySelector('.element__title');
const popupProfile = document.querySelector('.popup-profile');
const buttonEdit = document.querySelector('.profile__button_making_edit');
const buttonAdd = document.querySelector('.profile__button_making_add');
const buttonsExit = document.querySelectorAll('.popup__button_making_exit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleNew = document.querySelector('#profile-title');
const profileSubtitleNew = document.querySelector('#profile-subtitle');
const popupElement = document.querySelector('.popup-element');
const popupElementContainer = popupElement.querySelector('.popup__container');
const newElementTitle = document.querySelector('#element-title');
const newElementLink = document.querySelector('#element-link');
const popupImage = document.querySelector('.popup-image');
const imagePopupImage = popupImage.querySelector('.popup__image');
const subtitlePopupImage = popupImage.querySelector('.popup__subtitle');
const elementTemplate = document.querySelector('#elementTemplate').content;

function openPopup(evt) {
  evt.classList.add('popup_opened');
};
function closePopup(evt) {
  evt.classList.remove('popup_opened');
};
function openPopupPorfile() {
  profileTitleNew.value = profileTitle.textContent;
  profileSubtitleNew.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};
buttonEdit.addEventListener('click', openPopupPorfile);
function saveProfile(evt) {
  evt.preventDefault();
  if (profileTitleNew.value && profileSubtitleNew.value) {
    profileTitle.textContent = profileTitleNew.value;
    profileSubtitle.textContent = profileSubtitleNew.value;
    closePopup(popupProfile);
  }
};
popupProfile.addEventListener('submit', saveProfile);

buttonAdd.addEventListener('click', () => {
  openPopup(popupElement);
});
buttonsExit.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
function addLike(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('like_active');
};
function createElement(element) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  newElement.querySelector('.element__title').textContent = element.name;
  elementImage.src = element.link;
  elementImage.alt = element.name;
  newElement.querySelector('.like').addEventListener('click', addLike);
  newElement.querySelector('.element__button_remove').addEventListener('click', removeElement);
  elementImage.addEventListener('click', (evt) => { openImage(elementImage.src, elementImage.alt); });
  return newElement;
}
function newElement(element) {
  if (element) {
    const newElement = createElement(element);
    elements.prepend(newElement);
  }
};
function saveElement(evt) {
  evt.preventDefault();
  if (newElementTitle.value && newElementLink.value) {
    const element = {};
    element['name'] = newElementTitle.value;
    element['link'] = newElementLink.value;
    newElement(element);
    closePopup(popupElement);
  }
};
function removeElement(evt) {
  evt.target.closest('.element').remove();
}
function openImage(src, alt) {
  openPopup(popupImage);
  imagePopupImage.setAttribute('src', src);
  imagePopupImage.setAttribute('alt', alt);
  subtitlePopupImage.textContent = alt;
};
initialCards.forEach(newElement);
popupElement.addEventListener('submit', saveElement);




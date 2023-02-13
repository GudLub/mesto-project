import './index.css';

import { set, buttonEditAvatar, profile, buttonEdit, buttonAdd, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew } from '../components/utils.js';

import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';

const buttonProfile = document.querySelector('.popup__button_making_save_profile');
const buttonAvatar = document.querySelector('#avatarSubmit');
const buttonElement = document.querySelector('#submitButton');
const cardAddFormElement = document.querySelector('#popupForm');

const api = new Api({ 
  url: 'https://mesto.nomoreparties.co/v1/plus-cohort-18/',
  headers: {
    authorization: '761944ff-ca64-4e82-a14c-fe8b959c12ae',
    'Content-Type': 'application/json',
},
});

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);
let newElement;
let section;

const popupWithImage = new PopupWithImage('#popupImage');
popupWithImage.setEventListeners();

const profileValidator = new FormValidator(set, document.querySelector('#popupProfile'));
 profileValidator.enableValidation();
 const cardValidator = new FormValidator(set, document.querySelector('#newElementId'));
 cardValidator.enableValidation();
 const avatarValidator = new FormValidator(set, document.querySelector('#popupAvatar'));
 avatarValidator.enableValidation();

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([myProfile, cards]) => {
  userInfo.setUserInfo(myProfile);
  section = new Section({
    renderer: (item) => {
      newElement = addNewElement(item);
      section.addItem(newElement);
    }
  }, '.elements');
  section.renderItems(cards);
})
  .catch((err) => {
    console.error(err);
  });

function addNewElement(data) {
const card = new Card (
  data, profile, popupWithImage,
  {myNewElementDelete: (item) => {
    api.deleteMyElement(item._id)
  .then(() => {
    card.removeNewElement();
  })
  .catch((err) => {
    console.error(err);
  })
  },
  myNewElementPutLike: (item) => {
    api.putLike(item._id)
      .then((data) => {
        card.newElementPutLike(data);
      })
      .catch((err) => {
        console.error(err)
      })},
  myNewElementDeleteLike: (item) => {
    api.unputLike(item._id)
      .then((data) => {
        card.newElementDeleteLike(data);
      })
      .catch((err) => {
        console.error(err)
      })
  }});
  return card.createElement();
}

const popupChangeData = new PopupWithForm('#popupProfile', (evt, getInputs) => {
  evt.preventDefault();
  buttonProfile.textContent = 'Сохранение...';
  api.editProfile({
    name: getInputs.name,
    about: getInputs.about,
  })
  .then((data) => {
    userInfo.setUserInfo(data);
    popupChangeData.closePopup();
  })
  .catch(err => console.log(err))
  .finally(() => {
    buttonProfile.textContent = "Сохранить";
  })
});
popupChangeData.setEventListeners();

const popupChangeAvatar = new PopupWithForm('#popupAvatar', (evt, getInputs) => {
  evt.preventDefault();
  buttonAvatar.textContent = 'Сохранение...';
  api.editProfileAvatar({
    avatar: getInputs.avatar,
  })
  .then((data) => {
    userInfo.setUserInfo(data);
    popupChangeAvatar.closePopup();
  })
  .catch(err => console.log(err))
  .finally(() => {
    buttonAvatar.textContent = 'Сохранить';
  })
});
popupChangeAvatar.setEventListeners();


const popupAddUserCard = new PopupWithForm('#newElementId', (evt, getInputs) => {
  evt.preventDefault();
  buttonElement.textContent = "Создание...";
  api.postNewElement(getInputs)
  .then((card) => {
    cardAddFormElement.reset();
    cardElement = addNewElement(card);
    section.addItem(cardElement);
    popupAddUserCard.closePopup();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    buttonElement.textContent = "Создать";
  });
});
popupAddUserCard.setEventListeners();


buttonEditAvatar.addEventListener('click', function() {
  avatarValidator.removeValidationErrors();
  popupChangeAvatar.openPopup();
});

buttonAdd.addEventListener('click', function () {
  cardValidator.removeValidationErrors();
  popupAddUserCard.openPopup();
});

buttonEdit.addEventListener('click', function () {
  popupChangeData.openPopup();
  const info = userInfo.getUserInfo();
  profileTitleNew.value = info.name;
  profileSubtitleNew.value = info.about;
 });
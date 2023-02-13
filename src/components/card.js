export default class Card {
    constructor(data, profile, handleCardClick, {myNewElementDelete, myNewElementPutLike, myNewElementDeleteLike}) {
        this.data = data;
        this._name = data.name,
        this._link = data.link,
        this._id = data._id,

        this.profile = profile;
        this.handleCardClick = handleCardClick;

        this.myNewElementDelete = myNewElementDelete;
        this.myNewElementPutLike = myNewElementPutLike;
        this.myNewElementDeleteLike = myNewElementDeleteLike;
        this.newElement = document.querySelector('#elementTemplate').content.querySelector('.element').cloneNode(true);
        this._elementImage = this.newElement.querySelector('.element__image');
        this._elementTitle = this.newElement.querySelector('.element__title');
        this.like = this.newElement.querySelector('.like');
        this.deleteElement = this.newElement.querySelector('.element__button_remove');
        this.likeSum = this.newElement.querySelector('.element__like-sum');
    }

    createElement() {
        this._elementTitle.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;

        if (this.data.likes.length === 0) {
            this.likeSum.textContent = "";
        } else {
            this.likeSum.textContent = this.data.likes.length;
        }
        if (this.profile.id === this.data.owner._id) {
            this.deleteElement.classList.add('element__button_remove_active'); 
        }
        this.data.likes.forEach((obj) => {{
            if (Object.values(obj).includes(this.profile.id)) {
            this.like.classList.add('like_active');
            }
        }})
        this._setEventListeners();
        return this.newElement;
    }

    removeNewElement() {
        this.newElement.remove();
    }
    
    newElementPutLike(data) {
        this.like.classList.add('like_active'); 
        this.likeSum.textContent = data.likes.length;
    }

    newElementDeleteLike() {
        this.like.classList.remove('like_active');
        if (data.likes.length === 0) {
            this.likeSum.textContent = "";
        } else {
            this.likeSum.textContent = data.likes.length;
        }
    }
    // _putLike(evt) {
    //     if (!evt.target.classList.contains('like_active')) {
    //         api.putLike(element._id)
    //             .then((data) => {
    //                 evt.target.classList.add('like_active');
    //                 likeSum.textContent = data.likes.length;
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             })
    //     } else {
    //         api.unputLike(element._id)
    //             .then((data) => {
    //                 evt.target.classList.remove('like_active');
    //                 likeSum.textContent = data.likes.length;
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             })

    //     }
    // }
    _setEventListeners() {
        this.newElement.querySelector(".element__image").addEventListener('click', () => {
            this.handleCardClick(this._name, this._link);
        })
        this.like.addEventListener('click', (evt) => {
            if (!evt.target.classList.contains("like_active")) {
                this.newElementPutLike(this.newElement);
              } else {
                this.newElementDeleteLike(this.newElement);
              }
        })

        this.deleteElement.addEventListener('click', (evt) => {
            this.removeNewElement(this.newElement);
        })
    }
}

        // elementImage.addEventListener('click', () => {
        //     imagePopupImage.src = elementImage.src;
        //     imagePopupImage.alt = elementTitle.textContent;
        //     openImage(elementImage, elementTitle);
        // });






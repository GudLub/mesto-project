export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
    _request(url, options) {
        return fetch(url, options).then(this._checkRes);
    }
    getInitialCards() {
        return this._request(`${this._url}/cards`, {
            headers: this._headers
        })
    }
    getUser() {
        return this._request(`${this._url}/users/me`, {
            headers: this._headers
        })
    }
    editProfileAvatar(ava) {
        return this._request(`${this._urll}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: ava
            })
        })
    }
    editProfile(title, subtitle) {
        return this._request(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                about: subtitle
            })
        })
    }
    postNewElement(name, link) {
        return this._request(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }
    deleteMyElement(elementId) {
        return this._request(`${this._url}/cards/${elementId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }
    putLike(elementId) {
        return this._request(`${this._url}/cards/likes/${elementId}`, {
            method: 'PUT',
            headers: this._headers
        })
    }
    unputLike(elementId) {
        return this._request(`${this._url}/cards/likes/${elementId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }
}




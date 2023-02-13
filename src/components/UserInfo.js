export default class UserInfo {
    constructor(name, about, avatar) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    };

    getUserInfo() {
        this.name = this._name.textContent;
        this.about = this._about.textContent;
        this.avatar = this._avatar.src;
      return this;
    };

    setUserInfo(data) {
        if(data.title) {
            this._title.textContent = data.title;
        }
        if(data.subtitle) {
            this._subtitle.textContent = data.subtitle;
        }
        if(data.avatar) {
            this._avatar.src = data.avatar;
        }
        if(data._id){
            this.userId = data._id;
        }
    };

};
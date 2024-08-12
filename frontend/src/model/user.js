import { v4 as uuidv4 } from "uuid";
import { constants } from "../utils/helper";

export class User {
  constructor(username, email, password) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.likedPosts = [];
    this.urlIdentifier = User._generateIdentifier();
    this.mainUrl = User.generateUrl(this.urlIdentifier);
    this.thumbUrl = User.generateUrl(this.urlIdentifier, constants.thumb);
  }

  static _generateIdentifier() {
    return Math.floor(Math.random() * 100);
  }

  static generateUrl(identifier, token = null) {
    return `https://randomuser.me/api/portraits/${
      token ? token + "/" : ""
    }men/${identifier}.jpg`;
  }
}

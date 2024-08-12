import { v4 as uuidv4 } from "uuid";
import { getItemObj } from "../data/db";
import { constants } from "../utils/helper";

export class Post {
  constructor(imageUrl, description) {
    this.id = uuidv4();
    this.userId = getItemObj(constants.currUser).id;
    this.createdBy = getItemObj(constants.currUser).username;
    this.createdAt = Date.now();
    this.imageUrl = imageUrl;
    this.description = description;
    this.like = 0;
    this.comments = [];
  }
}

export class Comment {
  constructor(comment, user) {
    this.id = uuidv4();
    this.userId = user.id;
    this.username = user.username;
    this.comment = comment;
  }
}

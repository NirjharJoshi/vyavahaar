import { getItemObj } from "../data/db";
import { constants } from "../utils/helper";

export function renderProfile() {
  const imageEle = document.getElementById("pro-image");
  const usernameEle = document.getElementById("pro-username");
  const emailEle = document.getElementById("pro-email");

  const currUser = getItemObj(constants.currUser);
  imageEle.src = currUser.mainUrl;
  usernameEle.innerText = currUser.username;
  emailEle.innerText = currUser.email;
}

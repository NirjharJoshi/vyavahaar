import { initSocket, sendNotification } from "../api/notification";
import { getItemObj, setItemObj } from "../data/db";
import { User } from "../model/user";
import { constants, notifications } from "../utils/helper";
import { moveToDashboard } from "../view/dashboardView";
import { switchToLogin, switchToSignup } from "../view/loginView";
import { renderProfile } from "../view/profileView";

export function handleLogin(e) {
  e.preventDefault();
  const username = e.target[0].value;
  const password = e.target[1].value;
  if (!username || !password) return;
  if (!_isUserAlreadyRegistered(username, password)) {
    switchToSignup();
    return;
  }
  moveToDashboard();
  const currUser = getItemObj(constants.currUser);
  initSocket(currUser.id, currUser.username);
}

export function handleSignup(e) {
  e.preventDefault();
  const username = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  if (!username || !email || !password) return;
  if (!_unique(username)) return;
  if (_isUserAlreadyRegistered(username, password)) {
    switchToLogin();
    return;
  }
  _addNewUser(username, email, password);
  moveToDashboard();
  const currUser = getItemObj(constants.currUser);
  initSocket(currUser.id, currUser.username);
}

export function handleUpdateProfile(e) {
  e.preventDefault();
  const uUsername = e.target[0].value;
  const uEmail = e.target[1].value;
  const uUrlIdentifier = e.target[2].value;
  const uPassword = e.target[3].value;
  if (!uUsername || !uEmail || !uUrlIdentifier || !uPassword) return;

  const currUser = getItemObj(constants.currUser);
  currUser.username = uUsername;
  currUser.email = uEmail;
  currUser.password = uPassword;
  currUser.urlIdentifier = uUrlIdentifier;
  currUser.mainUrl = User.generateUrl(uUrlIdentifier);
  currUser.thumbUrl = User.generateUrl(uUrlIdentifier, constants.thumb);

  const users = getItemObj(constants.users);
  let index = users.findIndex((u) => u.id === currUser.id);

  users[index] = currUser;
  setItemObj(constants.currUser, currUser);
  setItemObj(constants.users, users);

  renderProfile();
}

function _unique(username) {
  const users = getItemObj(constants.users);
  const index = users.findIndex((u) => u.username === username);
  return index === -1;
}

function _addNewUser(username, email, password) {
  let obj = new User(username, email, password);
  setItemObj(constants.currUser, obj);
  let users = getItemObj(constants.users);
  users.push(obj);
  setItemObj(constants.users, users);
}

function _isUserAlreadyRegistered(username, password) {
  let users = getItemObj(constants.users);
  if (!users) return false;
  let index = users.findIndex(
    (u) => u.username === username && u.password === password
  );
  if (index === -1) return false;
  setItemObj(constants.currUser, users[index]);
  return true;
}

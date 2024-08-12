import { handlePost } from "../controller/postController";
import { handleUpdateProfile } from "../controller/userController";
import { getItemObj } from "../data/db";
import { constants, defaultComment, notifications } from "../utils/helper";
import { renderProfile } from "./profileView";

export function moveToDashboard() {
  const modalEleLogin = document.getElementById("modal-login");
  modalEleLogin.style.display = "none";
  initDashboard();
  renderAllPosts();
}

function initDashboard() {
  // Create Post
  const modalPostEle = document.getElementById("modal-post");
  const btnStartPost = document.getElementById("btn-start-post");
  const formNewPost = document.getElementById("newPost");

  btnStartPost.addEventListener("click", (e) => {
    modalPostEle.style.display = "flex";
    renderProfile();
    formNewPost.addEventListener("submit", handlePost);
  });

  modalPostEle.addEventListener("click", (e) => {
    if (e.target.id === "modal-post") {
      modalPostEle.style.display = "none";
      formNewPost.removeEventListener("submit", handlePost);
    }
  });

  // Update User Profile
  const btnUserInfo = document.getElementById("btn-user-info");
  const modalUserInfoEle = document.getElementById("modal-user-info");
  const formUpdateProfile = document.getElementById("update-profile");

  btnUserInfo.innerText = getItemObj(constants.currUser).username;

  btnUserInfo.addEventListener("click", (e) => {
    modalUserInfoEle.style.display = "flex";
    renderProfile();
    const currUser = getItemObj(constants.currUser);
    document.getElementById("u-username").value = currUser.username;
    document.getElementById("u-email").value = currUser.email;
    document.getElementById("u-imageUrl").value = currUser.urlIdentifier;
    document.getElementById("u-password").value = currUser.password;
    formUpdateProfile.addEventListener("submit", handleUpdateProfile);
  });

  modalUserInfoEle.addEventListener("click", (e) => {
    if (e.target.id === "modal-user-info") {
      modalUserInfoEle.style.display = "none";
      renderAllPosts();
      formUpdateProfile.removeEventListener("submit", handleUpdateProfile);
    }
  });
}

export function renderNotification(data) {
  const notificationsEle = document.getElementById("notifications");
  let notification = "";
  const fromUsername = data.fromUsername;
  if (data.interaction === notifications.like) {
    notification = `${fromUsername} liked your post, you gained ${data.likeCount} ♥!!!`;
  }
  if (data.interaction === notifications.dislike) {
    notification = `${fromUsername} don't like your post anymore, don't worry ${data.likeCount} people still like your post ❣!!!`;
  }
  if (data.interaction === notifications.comment) {
    notification = `${fromUsername} commented on your post, "${data.comment}"!!!`;
  }
  notificationsEle.insertAdjacentHTML(
    "afterbegin",
    `
    <div><a href="#${data.toPostId}">${notification}</a></div>
    `
  );
}

export function hideCreateForm() {
  const formNewPost = document.getElementById("newPost");
  const modalPostEle = document.getElementById("modal-post");
  formNewPost.reset();
  modalPostEle.style.display = "none";
}

export function renderAllPosts() {
  const secEleAllPosts = document.getElementById("all-posts");
  secEleAllPosts.innerHTML = "";
  let posts = getItemObj(constants.posts);
  let users = getItemObj(constants.users);
  let currUser = getItemObj(constants.currUser);
  posts = posts.map((p) => {
    p.thumbUrl = users.find((u) => u.id === p.userId)?.thumbUrl;
    return p;
  });
  posts.forEach((p) => {
    let comments = `<div>${defaultComment}</div>`;

    if (p.comments.length > 0) {
      comments = "";
      p.comments.forEach(
        (c) =>
          (comments += `
            <div><b>${c.username} : </b> ${c.comment}</div>
          `)
      );
    }
    secEleAllPosts.insertAdjacentHTML(
      "afterbegin",
      `
      <div id=${p.id} class="post ${
        p.userId === currUser.id ? "post-user" : ""
      }" >
        <div class="post-left">
          <img src=${p.imageUrl} />
          <div style="border-bottom: 2px solid aliceblue; padding-bottom: 0.5rem;">${
            p.description
          }</div>
          <p class="inline"><img class="thumb" src=${p.thumbUrl} /></i> ${
        p.createdBy
      }</p>
          <p><i class="fa-solid fa-clock"></i> ${_formatDate(p.createdAt)}</p>
          <div>
            <span class="like-wrapper" data-post-id=${
              p.id
            }><i class="fa-solid fa-heart fa-shake asButton" style="margin-right: 10px;"></i> <span>${
        p.like
      }</span></span>
            <span id="comment-wrapper"><i class="fa-solid fa-comments" style="margin-right: 10px"></i> <span>${_commentCount(
              p.comments
            )}</span></span>
          </div>
        </div>
        <div class="post-right">
          <div class="comments">
            ${comments}
          </div>
          <form id="form-comment" data-form-id=${p.id}>
            <input type="text" id="comment" name="comment" placeholder="Type Your Comment..." />
            <button type="button" class="btn-comment"><i class="fa-solid fa-paper-plane" style="font-size: x-large;"></i></button>
          </form>
        </div>
      </div>
      `
    );
  });

  const comments = document.querySelectorAll(".comments");
  comments.forEach((c) => (c.scrollTop = c.scrollHeight));
}

function _formatDate(timestamp) {
  return new Date(timestamp).toString().split(" ").slice(1, 4).join(" ");
}

function _commentCount(p) {
  return p.length === 0 ? 0 : p.length;
}

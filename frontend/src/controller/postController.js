import { sendNotification } from "../api/notification.js";
import { getItemObj, setItemObj } from "../data/db.js";
import { Comment, Post } from "../model/post.js";
import { constants, defaultComment, notifications } from "../utils/helper.js";
import { hideCreateForm, renderAllPosts } from "../view/dashboardView.js";

export function handlePostEvent(e) {
  e.preventDefault();
  const likeWrapperEle = e.target.closest(".like-wrapper");
  const formCommentEle = e.target.closest("#form-comment");
  const btnComment = e.target.closest(".btn-comment");
  if (likeWrapperEle) {
    handleLike(e, likeWrapperEle);
  } else if (formCommentEle && btnComment) {
    handleComment(e, formCommentEle);
  }
}

export function handlePost(e) {
  e.preventDefault();
  const imageUrl = e.target[0].value;
  const description = e.target[1].value;

  if (!imageUrl || !description) return;

  const post = new Post(imageUrl, description);
  console.log(post);
  addNewPost(post);
  hideCreateForm();
  renderAllPosts();
}

function handleComment(e, formCommentEle) {
  const comment = formCommentEle.children[0].value;
  if (comment.length < 3) return;
  formCommentEle.reset();
  const currUser = getItemObj(constants.currUser);
  const commentObj = new Comment(comment, currUser);
  const postId = formCommentEle.getAttribute("data-form-id");
  const posts = getItemObj(constants.posts);
  let index = posts.findIndex((p) => p.id === postId);
  posts[index].comments.push(commentObj);
  setItemObj(constants.posts, posts);

  const commentsEle = e.target.closest(".post-right").children[0];
  const firstComment = commentsEle.children[0].innerText;
  if (firstComment === defaultComment) {
    commentsEle.innerHTML = "";
  }
  commentsEle.insertAdjacentHTML(
    "beforeend",
    `
    <div><b>${commentObj.username} : </b>${commentObj.comment}</div>
    `
  );

  const postEle = e.target.closest(".post");
  const commentCountEle = postEle.querySelector("#comment-wrapper");
  let commentCount = +commentCountEle.children[1].innerText;
  commentCountEle.children[1].innerText = ++commentCount;

  if (posts[index].userId === currUser.id) return;
  sendNotification({
    userId: posts[index].userId,
    username: posts[index].createdBy,
    postId: postId,
    interaction: notifications.comment,
    comment: comment,
  });
}

function handleLike(e, likeWrapperEle) {
  const postId = likeWrapperEle.getAttribute("data-post-id");
  const currUser = getItemObj(constants.currUser);
  const posts = getItemObj(constants.posts);
  let index = posts.findIndex((p) => p.id === postId);
  let likeCount = +likeWrapperEle.children[1].innerText;
  if (currUser.likedPosts.includes(postId)) {
    currUser.likedPosts = currUser.likedPosts.filter((id) => id !== postId);
    posts[index].like--;
    likeWrapperEle.children[1].innerText = --likeCount;
    if (posts[index].userId !== currUser.id)
      sendNotification({
        userId: posts[index].userId,
        username: posts[index].createdBy,
        postId: postId,
        interaction: notifications.dislike,
        likeCount: posts[index].like,
      });
  } else {
    currUser.likedPosts.push(postId);
    posts[index].like++;
    likeWrapperEle.children[1].innerText = ++likeCount;
    if (posts[index].userId !== currUser.id)
      sendNotification({
        userId: posts[index].userId,
        username: posts[index].createdBy,
        postId: postId,
        interaction: notifications.like,
        likeCount: posts[index].like,
      });
  }
  const users = getItemObj(constants.users);
  index = users.findIndex((u) => u.id === currUser.id);
  users[index] = currUser;
  setItemObj(constants.currUser, currUser);
  setItemObj(constants.users, users);
  setItemObj(constants.posts, posts);
}

function addNewPost(post) {
  let posts = getItemObj(constants.posts);
  posts.push(post);
  setItemObj(constants.posts, posts);
}

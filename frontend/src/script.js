import { handlePostEvent } from "./controller/postController.js";
import { handleLogin, handleSignup } from "./controller/userController.js";
import { initDB } from "./data/db.js";

initDB();

const formLogin = document.getElementById("login");
const formSignup = document.getElementById("signup");
const postsEle = document.getElementById("all-posts");

formLogin.addEventListener("submit", handleLogin);
formSignup.addEventListener("submit", handleSignup);
postsEle.addEventListener("click", handlePostEvent);

const loginUsernameEle = document.getElementById("l-name");
const loginPasswordEle = document.getElementById("l-password");
const loginForm = document.getElementById("login");

const signupUsernameEle = document.getElementById("s-name");
const signupPasswordEle = document.getElementById("s-password");
const signupEmailEle = document.getElementById("s-email");
const signupForm = document.getElementById("signup");

export function switchToSignup() {
  const username = loginUsernameEle.value;
  const password = loginPasswordEle.value;

  loginForm.reset();

  signupUsernameEle.value = username;
  signupPasswordEle.value = password;

  signupEmailEle.focus();
}

export function switchToLogin() {
  const username = signupUsernameEle.value;
  const password = signupPasswordEle.value;

  signupForm.reset();

  loginUsernameEle.value = username;
  loginPasswordEle.value = password;
}

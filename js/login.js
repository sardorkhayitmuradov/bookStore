"use strict";
let elLoginForm = document.querySelector(".login-page__form");
let elLoginUserName = document.querySelector(".login-page__username");
let elLoginPassword = document.querySelector(".login-page__password");

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let userNameInputValue = elLoginUserName.value;
  let userPasswordInputValue = elLoginPassword.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userNameInputValue,
      password: userPasswordInputValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("home.html");
      } else {
        alert("Login yoki parol xato kiritildi!");
      }
    });
});

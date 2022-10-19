"use strict";
let elLoginForm = document.querySelector(".login-page__form");
let elLoginUserEmail = document.querySelector(".login-page__userEmail");
let elLoginUserPassword = document.querySelector(".login-page__password");

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let userEmailValue = elLoginUserEmail.value;
  let userPasswordValue = elLoginUserPassword.value;

  let formData = new FormData();

  formData.append('Email', userEmailValue);
  formData.append('Password', userPasswordValue);

  fetch("https://book-shelter-webapi.herokuapp.com/api/Account/login", {
    method: "Post",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("home.html");
      } else {
        alert("Login yoki parol xato kiritildi!");
      }
    });
});


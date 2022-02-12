"use strict";

//Login uchun funksiya ///////////////////////////////
let elLogoutBtn = document.querySelector(".home-header__btn--logout");
let localToken = window.localStorage.getItem("token");

if (!localToken) {
  window.location.replace("index.html");
}

elLogoutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.replace("index.html");
});
//////////////////////////////////////////////////////////////

//Creat element qilish uchun detallar
let elResultList = document.querySelector(".cards__list");
let elSearchInput = document.querySelector(".home-header__input--search");
let elResultSum = document.querySelector(".home-hero__search--result-js");

let search = "search+terms";

//Cardlar yaratish uchun funksiya

const renderBooks = (arr, element) => {
  element.innerHTML = "";
  arr.forEach((book) => {
    const html = `
    <li class="cards__item d-flex flex-column">
        <img class="mb-3 mx-auto mt-4" src="${
          book.volumeInfo.imageLinks?.thumbnail
        }" alt="" width="201" height="202" />
        <h3 class="cards__title mt-auto">${book.volumeInfo.title}</h3>
        <p class="cards__desc--author">${
          book.volumeInfo.authors == undefined
            ? "Author not found"
            : book.volumeInfo.authors
        }</p>
        <p class="cards__desc--year">${
          book.volumeInfo.publishedDate == undefined
            ? "Published date not found"
            : book.volumeInfo.publishedDate
        }</p>
        <div class="cards__btn-cllection mb-1 mt-auto">
            <button class="cards__btn--bookmark btn btn-warning" data-btnBookmar="${
              book.id
            }">Bookmark</button>
            <button class="cards__btn--info text-primary" data-btnInfo="${
              book.id
            }"> More Info</button>
        </div>
        <a href="${
          book.volumeInfo.previewLink
        }" class="cards__btn--read btn btn-secondary">Read</a>
    </li>
    `;
    element.insertAdjacentHTML("beforeend", html);
  });
};

// Ma'lumotlar API dan olinmoqda
let getBooks = async () => {
  try {
    let res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}`
    );
    let data = await res.json();
    elResultSum.textContent = data.totalItems;
    renderBooks(data.items, elResultList);
  } catch (error) {
    alert(error);
  }
};
getBooks();

//Search inputdan izlash uchun funksiya
elSearchInput.onchange = () => {
  let searchValue = elSearchInput.value;
  if (searchValue.length !== 0) {
    elSearchInput.value = null;
    search = searchValue;
    getBooks();
  } else {
    search = "search+terms";
    getBooks();
  }
};

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
let elOrderBtn = document.querySelector(".home-hero__btn--order");
let elBookmarksList = document.querySelector(".bookmarks__list");
let elModal = document.querySelector(".modal-content");
let elPagenation = document.querySelector(".group-pagenation");
let elPrevBtn = document.querySelector(".prev-btn");
let elNextBtn = document.querySelector(".next-btn");

//Bookmarklar yaratish uchun funksiya
const renderBookmarks = (arr, element) => {
  element.innerHTML = null;
  arr.forEach((book) => {
    const html = `
        <li class="bookmarks__item d-flex align-items-center mb-3">
        <div>
          <h3 class="bookmarks__title--inner">${book.volumeInfo.title}</h3>
          <p class="bookmarks__desc--inner">${
            book.volumeInfo.authors == undefined
              ? "Author not found"
              : book.volumeInfo.authors
          }</p>
        </div>
        <a class="ms-auto me-1 flex-shrink-0" href="${
          book.volumeInfo.previewLink
        }"><img src="./img/book-open.png" width="24" height="24" alt="" /></a>
        <button data-removebookmarkbtn='${
          book.id
        }' class="btn flex-shrink-0 bookmarks__remove--btn">
          <img class="bookmarks__remove--btn"  data-removebookmarkbtn='${
            book.id
          }' src="./img/delete.png" width="24" height="24" alt="" />
        </button>
      </li>
        `;
    element.insertAdjacentHTML("beforeend", html);
  });
};

//Bookmarklarni saqlash uchun array
const bookmarkLocal = JSON.parse(window.localStorage.getItem("bookmarks"));
const bookmarks = bookmarkLocal || [];
renderBookmarks(bookmarks, elBookmarksList);
// Fetch dagi ma'lumotlar uchun o`zgaruvchilar
let search = "search+terms";
let order = "";
let page = 1;

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
//Modal yaratish uchun funksiya
const renderModal = (obj, element) => {
  let html = `
    <div class="modal__header d-flex align-items-center">
          <span class="close">&times;</span>
          <h4 class="my-auto modal__title">${obj?.volumeInfo.title}</h4>
        </div>
        <div class="modal__body d-flex flex-column align-items-center">
          <img src="${
            obj.volumeInfo.imageLinks?.thumbnail
          }" alt="" width="229" height="300" />
          <p class="modal__desc">${
            obj.volumeInfo.description == undefined
              ? ""
              : obj.volumeInfo.description
          }</p>
          <ul class="list-unstyled p-0 modal__list w-100 mt-5">
            <li class="d-flex flex-wrap mb-3">
              Author : <span class="modal__span">${
                obj.volumeInfo.authors
              }</span>
            </li>
            <li class="d-flex flex-wrap mb-3">
              Published : <span class="modal__span">${
                obj.volumeInfo.publishedDate
              }</span>
            </li>
            <li class="d-flex flex-wrap mb-3">
              Publishers: <span class="modal__span">${
                obj.volumeInfo.publisher
              }</span>
            </li>
            <li class="d-flex flex-wrap mb-3">
              Categories: <span class="modal__span">${
                obj.volumeInfo.categories
              }</span>
              
            </li>
            <li class="d-flex flex-wrap mb-3">
              Pages Count: <span class="modal__span">${
                obj.volumeInfo.pageCount
              }</span>
              
            </li>
          </ul>
        </div>
        <div class="modal__footer d-flex justify-content-end">
          <a href='${
            obj.volumeInfo.previewLink
          }' class="modal__btn--read btn btn-secondary">Read</a>
        </div>
    `;
  element.innerHTML = html;
};
//pagenation uchu funksiya
const renderPagenation = (arr, element) => {
  elPagenation.innerHTML = "";
  if (page === 1) {
    elPrevBtn.disabled = true;
  } else {
    elPrevBtn.disabled = false;
  }

  const countPage = Math.ceil(Number(arr.totalItems) / 12);

  if (page === countPage) {
    elNextBtn.disabled = true;
  } else {
    elNextBtn.disabled = false;
  }
  for (let i = 1; i <= countPage; i++) {
    let newPgeBtn = document.createElement("button");

    newPgeBtn.setAttribute("type", "button");
    newPgeBtn.setAttribute("class", "btn btn-outline-secondary");

    newPgeBtn.textContent = i;

    element.appendChild(newPgeBtn);
  }
  let elPage = document.querySelectorAll(".btn-group button");
  let active;
  elPage.forEach((item) => {
    item.addEventListener("click", () => {
      if (active) {
        item.classList.remove("active");
      }
      active = item;
      item.classList.add("active");
      let pageNumber = item.innerHTML == 1 ? 1 : item.innerHTML * 10;
      page = pageNumber;
      getBooks();
    });
  });
};
//Body ni scrolini o`chirib yoqish uchun funksiya
const scrollBody = () => {
  if (!myModal.classList.contains("hidden")) {
    // Disable scroll
    body.style.overflow = "hidden";
  } else {
    // Enable scroll
    body.style.overflow = "auto";
  }
};

//Bookmarklarni o`chirish uchun funksiya

elBookmarksList.addEventListener("click", (evt) => {
  if (evt.target.matches(".bookmarks__remove--btn")) {
    const bookmarkRemoveId = evt.target.dataset.removebookmarkbtn;
    const foundBookmarkIndex = bookmarks.findIndex(
      (book) => book.id === bookmarkRemoveId
    );
    bookmarks.splice(foundBookmarkIndex, 1);
    elBookmarksList.innerHTML = null;
    renderBookmarks(bookmarks, elBookmarksList);
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
});

//modal yo`q bo`lishi uchun funksiya
window.onclick = (evt) => {
  if (evt.target.matches(".modal")) {
    myModal.style.display = "none";
    myModal.classList.add("hidden");
    scrollBody();
  }
  if (evt.target.matches(".close")) {
    myModal.style.display = "none";
    myModal.classList.add("hidden");
    scrollBody();
  }
};
document.addEventListener("keydown", (evt) => {
  if (evt.keyCode == "27") {
    myModal.style.display = "none";
    myModal.classList.add("hidden");
    scrollBody();
  }
});

// Ma'lumotlar API dan olinmoqda
let getBooks = async () => {
  try {
    let res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}${order}&maxResults=12&startIndex=${page}`
    );
    let data = await res.json();
    elResultSum.textContent = data.totalItems;
    renderBooks(data.items, elResultList);
    renderPagenation(data, elPagenation);
    elResultList.addEventListener("click", (evt) => {
      if (evt.target.matches(".cards__btn--bookmark")) {
        let bookmarkId = evt.target.dataset.btnbookmar;
        const foundFilm = data.items.find((book) => bookmarkId == book.id);
        if (!bookmarks.includes(foundFilm)) {
          if (foundFilm != undefined) {
            bookmarks.push(foundFilm);
          }
        } else {
          alert("Bu bookmarklarga qo`shilgan");
        }
        renderBookmarks(bookmarks, elBookmarksList);
        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      } else if (evt.target.matches(".cards__btn--info")) {
        let infoId = evt.target.dataset.btninfo;
        let foundModal = data.items.find((book) => book.id == infoId);
        myModal.style.display = "block";
        myModal.classList.remove("hidden");
        scrollBody();
        renderModal(foundModal, elModal);
      }
    });
  } catch {
    elResultList.textContent = "Izlangan kitobni topishning iloji bo`lmadi 😓";
  }
};
getBooks();

//Search inputdan izlash uchun funksiya
elSearchInput.onchange = () => {
  let searchValue = elSearchInput.value.trim();
  if (searchValue.length !== 0) {
    elSearchInput.value = null;
    order = "";
    search = searchValue;
    getBooks();
  } else {
    search = "search+terms";
    getBooks();
  }
};

//Order qilish uchun funksiya

elOrderBtn.addEventListener("click", () => {
  order = "&orderBy=newest";
  getBooks();
});

elNextBtn.onclick = () => {
  page = page + 12;
  getBooks();
};
elPrevBtn.onclick = () => {
  if (page <= 1) {
    elPrevBtn.disable = true;
  } else {
    page = page - 12;
    getBooks();
  }
};

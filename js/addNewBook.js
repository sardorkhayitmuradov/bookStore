let elAddBookForm = document.querySelector('.add-book-form');
let elAddBookTitle = document.querySelector('.add-book-title');
let elAddBookImage = document.querySelector('.add-book-image');
let elAddBookDescription = document.querySelector('.add-book-description');
let elAddBookAuthorFullName = document.querySelector(
  '.add-book-author-fullname'
);

let elAddBookPublishedYear = document.querySelector('.add-book-published-year');
let elAddBookCategory = document.querySelector('.add-book-category');
let elAddBookPages = document.querySelector('.add-pook-pages');
let localToken = window.localStorage.getItem('token');

elAddBookForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let addBookTitleValue = elAddBookTitle.value;
  let addBookImageValue = elAddBookImage.files[0];
  let addBookDescriptionValue = elAddBookDescription.value;
  let addBookAuthorFullNameValue = elAddBookAuthorFullName.value;
  let addBookPublishedYearValue = elAddBookPublishedYear.value;
  let addBookCategoryValue = Number(elAddBookCategory.value);
  let addBookPagesValue = Number(elAddBookPages.value);
  let formData = new FormData();

  formData.append('Title', addBookTitleValue);
  formData.append('Image', addBookImageValue);
  formData.append('Description', addBookDescriptionValue);
  formData.append('AuthorFullName', addBookAuthorFullNameValue);
  formData.append('PublishedYear', addBookPublishedYearValue);
  formData.append('Category', addBookCategoryValue);
  formData.append('PagesCount', addBookPagesValue);

  fetch('https://book-shelter-webapi.herokuapp.com/api/Books', {
    method: 'Post',
    headers: {
      Authorization: `Bearer ${localToken}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      
      if (data) {
        window.location.replace('home.html');
      } else {
        alert('Error');
      }
    });
});

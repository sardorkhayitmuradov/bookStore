'use strict';
let elRegistrationForm = document.querySelector('.login-page__form');
let elRegistrationFirstName = document.querySelector('.login-page__firstName');
let elRegistrationLastName = document.querySelector('.login-page__lastName');
let elRegistrationUserAddress = document.querySelector('.login-page__userAddress');
let elRegistrationUserPhoneNumber = document.querySelector(
  '.login-page__userPhoneNumber'
);
let elRegistrationUserEmail = document.querySelector('.login-page__userEmail');
let elRegistrationPassword = document.querySelector('.login-page__password');
let elRegistrationImage = document.querySelector('.login-page__photo');

let already = document.querySelector('.already');

already.addEventListener('click' , ()=> {
  window.location.replace('login.html');
})
// let btn = document.querySelector('.formBtn')

elRegistrationForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let userFirstNameValue = elRegistrationFirstName.value;
  let userLastNameValue = elRegistrationLastName.value;
  let userAddressValue = elRegistrationUserAddress.value;
  let userPhoneNumberValue = elRegistrationUserPhoneNumber.value;
  let userEmailValue = elRegistrationUserEmail.value;
  let userPasswordValue = elRegistrationPassword.value;
  let userPhotoValue = elRegistrationImage.files[0]
  let formData = new FormData();

  formData.append('FirstName', userFirstNameValue);
  formData.append('LastName', userLastNameValue);
  formData.append('Address', userAddressValue);
  formData.append('PhoneNumber', userPhoneNumberValue);
  formData.append('Email', userEmailValue);
  formData.append('Password', userPasswordValue);
  formData.append('Image', userPhotoValue)


  fetch('https://book-shelter-webapi.herokuapp.com/api/Account/regstrate', {
    method: 'Post',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => { 
      console.log(data)
      if (data) {
        window.localStorage.setItem('data', data);

        window.location.replace('login.html');
      } else {
        alert('Error');
      }
    });
});



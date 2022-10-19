let elResultList = document.querySelector('.cards__list');

const renderUsers = (arr, element) => {
  element.innerHTML = '';
  arr.forEach((user) => {
    const html = `
      <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title"><p class="fw-bold">User :</p> ${user.firstName} ${user.lastName}</h5>
    <p class="card-text"><p class="fw-bold">Address: </p>${user.address}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><p class="fw-bold">Phone Number: </p> ${user.phoneNumber}</li>
    <li class="list-group-item"><p class="fw-bold">Email: </p>${user.email}</li>
    <li class="list-group-item"><p class="fw-bold">Id: </p> ${user.id}</li>
  </ul>
</div>
      `;
    element.insertAdjacentHTML('beforeend', html);
  });
};

let getUsers = async () => {
  let res = await fetch(
    `https://book-shelter-webapi.herokuapp.com/api/users?PageIndex=1&PageSize=30`
  );
  let data = await res.json();
  console.log(data);
  data ?  renderUsers(data, elResultList): elResultList.textContent = 'Wait .....';
};
getUsers();

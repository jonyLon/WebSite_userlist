document.addEventListener('DOMContentLoaded', () => {
let users = localStorage.users;

if (users) {
    users = JSON.parse(users);

    let listContainer = document.getElementById("list-container");
    users.forEach((user, index) => {
        listContainer.innerHTML += (`<a href="#" class="list-group-item list-group-item-action list-user-info" aria-current="true" data-index="${index}">
            <div class="d-flex w-100 justify-content-between">
                <img src=${user.image} alt="" style="width:100px;">
                <h5 class="p-1 pt-3" >${user.lastName} ${user.name}</h5>
                <small class="pt-2 p-1 button_del" style="float: right;" data-index="${index}"><img src="/img/trash-bin.png" alt="delete" style="width: 40px"></small>
            </div>
            <hr>
            <p class="mb-1">Email: ${user.email}</p>
            <p class="mb-1">Phone: ${user.phone}</p>
        </a>`);
    });

    var del_infos = document.getElementsByClassName("button_del");
    Array.from(del_infos).forEach((item) => {
        item.addEventListener('click', (event) => {
            let userIndex = item.getAttribute('data-index');
            users.splice(userIndex, 1);
            localStorage.users = JSON.stringify(users);
            
            let parentElement = item.closest('.list-user-info');
            parentElement.remove();
        });
    });
} else {
    console.log('No users found in localStorage');
}
});
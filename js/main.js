var getClients = document.getElementById("getClients");

getClients.addEventListener('click', () => {
    fetchUsers().then(users => {

        // console.log(user);
        // console.log(user.address);
        // console.log(user.company);
        // I want to iterrate over each user key 
        let user = users[0];
        user.geo = "";
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                const th = document.createElement("th");
                th.textContent = key.toUpperCase();
                table_headder.appendChild(th);
            }
        }

        const keys = Object.keys(user);
        users.forEach((user, index) => {

            const tr = document.createElement("tr");
            tr.className = 'table-primary';
            tr.setAttribute("data-index", index);

            keys.forEach(key => {
                const td = document.createElement('td');
                if (key == "address") {
                    // console.log(user[key]);
                    td.textContent = user[key].city;
                } else if (key == "company") {
                    td.textContent = user[key].name;
                } else if (key == "geo") {
                    const mimg = document.createElement("img");
                    mimg.style.width = "30%";
                    mimg.src = "img/geo-marker.png";
                    mimg.addEventListener("click", () => {
                        initMap(parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng), user.address.city);
                    })
                    td.appendChild(mimg);
                }
                else {
                    td.textContent = user[key];
                }
                tr.appendChild(td);
            });
            users_tbody.appendChild(tr);
        });
    });
}, { once: true })


let fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return response.json();
}
const table_headder = document.getElementById("table-headder");
const users_tbody = document.getElementById("users-tbody");



function initMap(_lat, _lng, _title) {
    // Координати для мітки
    var coordinates = { lat: Math.abs(_lat - 10), lng: Math.abs(_lng) }; // Замініть на ваші координати

    // Створюємо карту
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: coordinates
    });

    // Додаємо мітку на карту
    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: _title // Замініть на ваше місце
    });
}


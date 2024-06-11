var btn = document.querySelector("#add");
const girls = document.getElementById("girls");
const image_url = document.getElementById("image_url");
btn.addEventListener("click", function () {
    const url = image_url.value;
    girls.innerHTML += `<img src="${url}" />`;
    //console.log("Кнопка нажата!!!", );
});
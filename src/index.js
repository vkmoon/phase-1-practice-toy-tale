let addToy = false;
const url = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchData();
  submitToy();
});

function fetchData() {
  fetch(url)
  .then(res => res.json())
  .then(toys => cardDivs(toys))
  .catch(error => "Error: " + error)
}

function postData(url, data = {}) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(data), 
  });
}


function cardDivs(toys) {
  const toyCollection = document.getElementById("toy-collection");
  toys.forEach(toy => {
    let div = document.createElement("div");
    div.classList.add("card");
    toyCollection.appendChild(div)

    let name = document.createElement("h2");
    name.innerText = toy.name;
    div.appendChild(name);

    let image = document.createElement("img");
    image.src = toy.image;
    image.classList.add("toy-avatar");
    div.appendChild(image);

    let likes = document.createElement("p");
    likes.innerText = `${toy.likes} Likes`;
    div.appendChild(likes);
    
    let button = document.createElement("button");
    button.classList.add("button");
    button.textContent = "Likes";
    div.appendChild(button);

    button.addEventListener("click", () => {
      likes.innerText = `${parseInt(likes.innerText) + 1} Likes`;
    });
  });
}

function submitToy() {
  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = document.querySelectorAll(".input-text");
    const data = {};
    Array.from(formData).forEach((input) => {
      data[input.name] = input.value;
    });

    postData(data);
  })
}
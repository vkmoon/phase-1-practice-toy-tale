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

function fetchData(data) {
  fetch(url)
  .then(res => res.json())
  .then(toys => cardDivs(toys))
  .catch(error => "Error: " + error)
};

function cardDivs(toys) {
  const toyCollection = document.getElementById("toy-collection");
  toys.forEach(toy => {
    let div = document.createElement("div");
    div.classList.add("card");
    toyCollection.appendChild(div);

    let name = document.createElement("h2");
    name.innerText = toy.name;
    div.appendChild(name);

    let image = document.createElement("img");
    image.src = toy.image;
    image.classList.add("toy-avatar");
    div.appendChild(image);

    let likes = document.createElement("p");
    likes.innerText = `${toy.likes || 0} Likes`;
    div.appendChild(likes);

    let button = document.createElement("button");
    button.classList.add("button");
    button.textContent = "Likes";
    div.appendChild(button);

    button.addEventListener("click", () => {
      let newNumberOfLikes = parseInt(likes.innerText) + 1;
      likes.innerText = `${newNumberOfLikes} Likes`;
      toy.likes = newNumberOfLikes;
    
      fetch(url + `/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ likes: newNumberOfLikes }),
      })
        .then(res => res.json())
        .then(updatedToy => {
          console.log(updatedToy);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });
  }
)};
function submitToy() {
  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = document.querySelectorAll(".input-text");
    const data = {};
    Array.from(formData).forEach((input) => {
      data[input.name] = input.value;
    });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(newToy => {
        cardDivs([newToy]);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });
}

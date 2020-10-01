import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

createMenu();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id"); // hidden input
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id"); // ?id=4

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;

(async function() {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    name.value = details.name;
    price.value = details.price;
    description.value = details.description;
    idInput.value = details.id;

  } catch(error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const idValue = idInput.value;

  if (nameValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
    displayMessage("warning", "Invalid values, please type something in.", ".message-container");
  } else {
    // UPDATE THE PRODUCT
    updateProduct(nameValue, priceValue, descriptionValue, idValue);
  }
}

async function updateProduct(name, price, description, id) {
  const url = baseUrl + "products/" + id;
  const data = JSON.stringify({ name: name, price: price, description: description });
  const token = getToken();

  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: data
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.updated_at) {
      displayMessage("success", "Product was updated", ".message-container");
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }



}

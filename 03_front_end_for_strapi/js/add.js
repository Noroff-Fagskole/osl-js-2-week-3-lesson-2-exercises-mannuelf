import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

createMenu();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);


function submitForm(e) {
  e.preventDefault();

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();

  console.log(priceValue, isNaN(priceValue));

  if (nameValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
    displayMessage("warning", "Invalid values, please type something in.", ".message-container");
  } else {
      // ADD THE PRODUCT
      addProduct(nameValue, priceValue, descriptionValue);
  }
}

async function addProduct(name, price, description) {
  // POST to /products
  const url = baseUrl + "products";

  const data = JSON.stringify({ name: name, price: price, description: description });
  const token = getToken();

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: data
    };
    const response = await fetch(url, options);
    const json = await response.json();

    console.log("json", json);

    if (json.created_at) {
      displayMessage("success", "Product has been added", ".message-container");
    }

    console.log(json.error);
    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }


  } catch (error) {
    console.log("error", error);
  }

}

// TODOS
/**
 * get all the inputs
 * a way for submit the form, we might need a tunctions
 * we will need to validate those inputs
 *
 * do a login and post to auth/local whcih is strapi backend (POST)
 *
 * do a fetch to get the usea object
 * save the token
 * save the user
 *
 * handle errors
 *
 */
import { baseUrl } from "./settings/api.js";
import { saveTokenToStorage, saveUserToStorage} from "./utils/storage.js"
import { tokenKey, userKey } from "./utils/storage.js";

const form = document.querySelector("#loginForm");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const userPassword = password.value.trim();
  // login
  doLogin(usernameValue, userPassword);
}

async function doLogin(usernameValue, userPassword) {
  const URL = `${baseUrl}auth/local`;

  const data = JSON.stringify({
    identifier: usernameValue,
    password: userPassword
  });

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    };
    const response = await fetch(URL, options);
    const json = await response.json();
    console.log("JSON", json.jwt);
    console.log("JSON", json.user);
    if (json.user) {
      saveTokenToStorage(tokenKey, json.jwt);
      saveUserToStorage(userKey,  json.user);
    }

  } catch (error) {
    console.log("error", error);
  }
}

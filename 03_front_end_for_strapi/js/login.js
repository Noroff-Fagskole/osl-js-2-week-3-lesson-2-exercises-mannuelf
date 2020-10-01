import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import { saveTokenToStorage, saveUserToStorage } from "./utils/storage.js"
import { tokenKey, userKey } from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const form = document.querySelector("#loginForm");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const userPassword = password.value.trim();

  if (usernameValue.length === 0 || userPassword.length === 0) {
    displayMessage("warning", "Invalid values, please type something in.", ".message-container");
  }

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
    console.log(json);
    if (json.user) {
      saveTokenToStorage(tokenKey, json.jwt);
      saveUserToStorage(userKey, json.user);

      location.href = "./";
    }

    if (json.error) {
      const message = json.error;
      displayMessage("warning", message, ".message-container");
    }

  } catch (error) {
    console.log("error", error);
  }
}

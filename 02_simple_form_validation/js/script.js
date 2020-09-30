const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

function validateForm(event) {
  event.preventDefault()
  // user input, we need never trust, they may input space
  if(checkLength(firstName.value, 2) ) {
    firstNameError.style.display = "none";
  } else {
    firstNameError.style.display = "block";
  }

  if(checkLength(lastName.value, 2)) {
    lastNameError.style.display = "none";
  } else {
    lastNameError.style.display = "block";
  }

  if(validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

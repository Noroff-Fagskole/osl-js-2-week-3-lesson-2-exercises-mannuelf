const form = document.querySelector("#contactForm");

form.onsubmit = function(event) {
  event.preventDefault(); // puased it
  console.log(event);
  const firstName = document.querySelector("#name");
  console.log("firstName", firstName);

  console.log(firstName.value);
}

function submitFormOnceWorkIsDone() {
  form.submit();
}

// js/checkout.js

document.querySelector("#checkoutSubmit").addEventListener("click", function (e) {
  e.preventDefault();

  const form = document.querySelector("#checkout-form");

  const isValid = form.checkValidity();
  form.reportValidity();

  if (!isValid) {
    return;
  }

  // For now — just go to success page
  // Later you can add real checkout logic here
  window.location.href = "/checkout/success.html";
});

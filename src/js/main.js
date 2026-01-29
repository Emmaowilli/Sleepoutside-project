async function loadTemplate(selector, path) {
  const element = document.querySelector(selector);
  if (element === null) {
    return;
  }

  const response = await fetch(path);
  if (!response.ok) {
    return;
  }

  element.innerHTML = await response.text();
}

loadTemplate("header", "../partials/header.html");
loadTemplate("footer", "../partials/footer.html");

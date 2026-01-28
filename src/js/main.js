async function loadTemplate(selector, path) {
  const element = document.querySelector(selector);
  if (element === null) {
    return;
  }

  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.warn(`Failed to load template: ${path} (${response.status})`);
      return;
    }

    element.innerHTML = await response.text();
  } catch (err) {
    console.error("Template load error:", err);
  }
}

// Use root-absolute paths (critical for subfolder pages)
loadTemplate("header", "/partials/header.html");
loadTemplate("footer", "/partials/footer.html");

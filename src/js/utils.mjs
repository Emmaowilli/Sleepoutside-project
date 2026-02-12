// src/js/utils.mjs

// Helper to safely read from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      return null; // return null if parsing fails
    }
  }
  return null;
}

// Helper to safely save to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Your existing function – unchanged
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = ""; // clear previous content
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

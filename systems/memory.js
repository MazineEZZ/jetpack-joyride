function loadItem(itemName) {
  return Number(localStorage.getItem(itemName));
}

function saveItem(itemName, itemValue) {
  localStorage.setItem(itemName, itemValue);
}

export { loadItem, saveItem };

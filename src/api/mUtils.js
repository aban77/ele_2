export function setLocalStorage(key, value) {
  if (!key) return;
  localStorage.setItem(key, value);
}

export function getLocalStorage(key) {
  if (!key) return;
  localStorage.getItem(key);
  return localStorage.getItem(key);
}
export function removeLocalStorage(key) {
  if (!key) return;
  localStorage.removeItem(key);
}

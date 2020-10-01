export const tokenKey = "token";
export const userKey = "user";

export function getToken() {
  return getFromStorage(tokenKey)
}

export function saveToken(token) {
  saveTokenToStorage(tokenKey, token)
}

export function saveUser(user) {
  saveUserToStorage(userKey, user);
}

export function getUsername() {
 const user = getFromStorage(userKey);

 if (user) {
  return user.username;
 }

 return null;
}

export function saveTokenToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveUserToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getFromStorage(key) {
  const value =  localStorage.getItem(key);
  if (!value) {
    return [];
  } else {
    return JSON.parse(value)
  }
}

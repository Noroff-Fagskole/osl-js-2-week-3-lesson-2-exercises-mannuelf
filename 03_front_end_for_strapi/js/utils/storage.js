export const tokenKey = "token";
export const userKey = "user";


// export get getToken
export function getToken() {
  return getFromStorage(tokenKey)
}

// export saveToken
export function saveToken(token) {
  saveTokenToStorage(tokenKey, token)
}

// export saveUser
export function saveUser(user) {
  saveUserToStorage(userKey, user);
}

// get user name
export function getUserName() {
 const user = getFromStorage(userKey);

 if (user) {
  return user.name;
 }

 return null;
}

// save to storage
export function saveTokenToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveUserToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// get from storage
function getFromStorage(key) {
  const value =  localStorage.getItem(key);

  if (!value) {
    return [];
  } else {
    return JSON.parsed(value)
  }
}

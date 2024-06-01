export function saveToken(token) {
  localStorage.setItem("token", token);
  console.log("Token created");
}

export function removeToken() {
  localStorage.removeItem("token");
  console.log("Token expired");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  // if there is the token, the user is logged in
  return getToken() !== null;
}

export function decodeToken(token) {
  if (isLoggedIn()) {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } else {
    return false;
  }
}

export function isVolunteer() {
  return decodeToken(getToken()).isVolunteer;
}

export function isCertifier() {
  return decodeToken(getToken()).isCertifier;
}

export function isOperator118() {
  return decodeToken(getToken()).isOperator118;
}

export function getUserId() {
  return decodeToken(getToken()).userId;
}
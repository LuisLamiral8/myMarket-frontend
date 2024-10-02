const USERNAME_KEY = "username";
export const saveUsername = (user) => {
  localStorage.setItem(USERNAME_KEY, user);
};
export const getUsername = () => {
  const user = localStorage.getItem(USERNAME_KEY);
  return user ? user : null;
};
export const saveUser = (param) => console.log("hello");

//Tema Cookies
export const saveTokenToCookie = (token) => {
  document.cookie = `jwt=${token}; path=/; Secure; SameSite=Strict;`;
};
export const getTokenFromCookie = () => {
  const name = "jwt=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};
export const clearUser = () => {
  document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  localStorage.removeItem(USERNAME_KEY);
};

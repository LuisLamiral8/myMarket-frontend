const USER_KEY = "user";
export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

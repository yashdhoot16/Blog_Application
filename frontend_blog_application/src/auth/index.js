// isLoggedIn => Check whether user is logged in or not..
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};

// doLogin=>  data=>  set to localstorage..
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//doLogout => remove from localstorage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

// Get currentUser Details.
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).userDto;
  } else {
    return undefined;
  }
};

// Get token from data(localstorage)
export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
};

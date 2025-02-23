import { myAxios, privateAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

export const login = (loginDetail) => {
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};

export const getUserDetails = (id) => {
  return privateAxios
    .get(`/api/users/${id}`)
    .then((response) => response.data);
};

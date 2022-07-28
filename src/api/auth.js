import client from "./client";

const endpoint = "/users/login/";

const phoneSubmit = (phone_number) =>
  client.post("/users/SendVerificationCode/", {phone_number});

const register = (userInfo) => client.post("/users/register/" , userInfo);

const login = (username, password) =>
  client.post(endpoint, { username, password });

const getProfile = (token) => {
  client.setHeaders({ 'Authorization': `Bearer ${token}`});
  return client.get("/users/profile/");
}

export default {
  login,
  getProfile,
  phoneSubmit,
  register,
};
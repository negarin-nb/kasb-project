import client from "./client";
const endpoint = "/users/login/";

const phoneSubmit = (phoneInfo) =>
  client.post("/users/SendVerificationCode/", phoneInfo);

const register = (userInfo) => client.post("/users/register/" , userInfo);

const login = (username, password) =>
  client.post(endpoint, { username, password });

const getProfile = (token) => {
  client.setHeaders({ 'Authorization': `Bearer ${token}`});
  return client.get("/users/profile/");
}
const editProfile = (token, userProfile) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.put("/users/profile/", userProfile);
};
export default {
  login,
  getProfile,
  editProfile,
  phoneSubmit,
  register,
};
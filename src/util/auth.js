import axios from "axios";
import Users, { addUser } from "../model/users";

const API_KEY = "AIzaSyDEi7EDnlWEXCS4A67MKKBLOztU2HYFAwY";

export async function createUser(phone, job, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    { phone: phone, job, password: password, returnSecureToken: true }
  );
  
  const token = response.data.idToken;
  return token;
}

export async function login(phone, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=" + API_KEY,
    { phone: phone, password: password, returnSecureToken: true }
  );
  const token = response.data.idToken;
  return token;
}

export function fakeCreateUser(name, job, phone) {
  const newUser = {
    id: 11,
    email: "user1@email.com",
    username: name,
    //job:job,
    phone:phone,
    password: phone,
    userToken: "token1235",
    cash: 0,
  };
  addUser(newUser);
  const token = response.data.idToken;
  return token;
}

export function fakeLogin(userName, password) {
  const foundUser = Users.filter((item) => {
    return userName == item.username && password == item.password;
  });
    const token = String(foundUser[0].userToken);
     //userName = foundUser[0].username;
    return foundUser;
}

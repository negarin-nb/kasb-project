import { createContext,useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false, 
  authenticate: (token) => {},
  logout: () => {},
  user:{
    id: 1,
    email: "",
    username: "",
    password: "",
    token: "",
    cash: 0
  }
});

export const AuthContextProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState('');
  const [authUser, setAuthUser] = useState({});
  
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function setUserData(user){
    setAuthUser(user);
    AsyncStorage.setItem("user", user);
  }

  function logout() {
    setAuthToken(null);
    setAuthUser({});
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    user: authUser,
    setUserData:setUserData,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

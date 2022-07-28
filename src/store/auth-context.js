import { createContext,useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from '../model/users';
import { async } from '../util/auth';

export const AuthContext = createContext({
  token: {},
  isAuthenticated: false,
  authenticate: (token) => {},
  setUserData: (user) => {},
  getUser: () => {},
  logout: () => {},
  user: {
    id: 1,
    email: "",
    username: "",
    password: "",
    token: "",
    cash: 0,
  },
});

export const AuthContextProvider = ({ children }) => {
  const [authAccessToken, setauthAccessToken] = useState('');
  const [authRefreshToken, setauthRefreshToken] = useState('');
  const [authToken, setAuthToken] = useState({
    authAccessToken: authAccessToken,
    authRefreshToken: authRefreshToken,
  });

  const [authUserProfile, setAuthUserProfile] = useState(null);
  
  function authenticate(data) {

    setAuthToken(data);
    setauthAccessToken(data.authAccessToken);
    setauthRefreshToken(data.authRefreshToken);
    AsyncStorage.setItem("Token", JSON.stringify(data));
    //AsyncStorage.setItem("refreshToken", token.refresh);
    //AsyncStorage.setItem("accessToken", token.refresh);
    //console.log("accessToken: " + token.access);
  }

  function setUserData(profil){
    setAuthUserProfile(profil);
    AsyncStorage.setItem("user", JSON.stringify(profil));
  }
 
  async function getUser(){
   if (!authUserProfile){
   const storedUser = await AsyncStorage.getItem("user");
   console.log("AsyncStorage called");
  return JSON.parse(storedUser);
  }
  console.log("localStorage called");
  console.log(authUserProfile);
  return authUserProfile;
  }

  function logout() {
    setAuthToken(null);
    setAuthUserProfile(null);
    setauthAccessToken('');
    AsyncStorage.removeItem("Token");
    AsyncStorage.removeItem("user");
  }

  const value = {
    token: authToken,
    accessToken: authAccessToken,
    refreshToken: authRefreshToken,
    isAuthenticated: !!authAccessToken,
    authenticate: authenticate,
    setUserData: setUserData,
    logout: logout,
    getUser: getUser,
    user: authUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

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
  authUserProfile: {
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
  const [cash, setCash] = useState();

  useEffect(() => {}, [authUserProfile, cash]);
  
   async function authenticate(data) {
    setAuthToken(data);
    setauthAccessToken(data.authAccessToken);
    setauthRefreshToken(data.authRefreshToken);
    console.log("authAccessToken");
    console.log(authAccessToken);
    await AsyncStorage.setItem("Token", JSON.stringify(data));
  }

  function setUserData(profil){
    setAuthUserProfile(profil); // this applied for next render of this component.
    AsyncStorage.setItem("user", JSON.stringify(profil));
  }

  function setUserCash(data){
    setCash(data);
    AsyncStorage.setItem("cash", JSON.stringify(data));
  }

  async function getUserCash(){
    if (!cash){
    const storedCash = await AsyncStorage.getItem("cash");
    setCash(JSON.parse(storedCash));
    return JSON.parse(storedCash);
  } 
  return cash;
  }

  async function getUser(){
   if (!authUserProfile){
    const storedUser = await AsyncStorage.getItem("user");
    setAuthUserProfile(JSON.parse(storedUser));
    //console.log("AsyncStorage called");
    return JSON.parse(storedUser);
  }
  //console.log("localStorage called");
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
    setUserCash: setUserCash,
    getUserCash: getUserCash,
    logout: logout,
    getUser: getUser,
    authUserProfile: authUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

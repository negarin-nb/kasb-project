import React from "react";
import { create } from "apisauce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";
//const token = AsyncStorage.getItem("token");
//console.log(token);

const accessToken = AsyncStorage.getItem("accessToken");
  
const apiClient = create({
  baseURL: "http://api.kasb-co.com",
  //headers: { Authorization: `Bearer ${AsyncStorage.getItem("accessToken")}` },
});

export default apiClient;
 
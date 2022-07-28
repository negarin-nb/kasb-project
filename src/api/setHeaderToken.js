import apiClient from "./client";


const setHeaderToken = (token) => {
 // apiClient.setHeader["Authorization"] = "";
 // delete apiClient.setHeader["Authorization"];

  if (token) {
    apiClient.setHeaders({ "Authorization": "Bearer " + token });
    console.log( "Authorization:"+ "Bearer " + token );
  }
};

import client from "./client";

const enterCost = (token, costData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.post("/financials/cost/", costData);
};
const getCostList = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/financials/cost/");
};
const getCostCategory = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/financials/cost/category/`);
}; 
const updateCost = (token, costData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.put("/financials/cost/", costData);
};
const deleteCost = (token, id) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.delete(`/financials/cost/${id}/`);
};

export default {
  enterCost,
  getCostList,
  getCostCategory,
  updateCost,
  deleteCost,
};

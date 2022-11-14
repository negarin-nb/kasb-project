import client from "./client";

const enterIncome = (token, incomeData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.post("/financials/income/", incomeData);
};
const getIncomeList = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/financials/income/");
};
const getIncomeCategory = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/financials/income/category/`);
};
const updateIncome = (token, incomeData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.put("/financials/income/", incomeData);
};
const deleteIncome = (token, id) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.delete(`/financials/income/${id}/`);
};

export default {
  enterIncome,
  getIncomeList,
  getIncomeCategory,
  updateIncome,
  deleteIncome,
};

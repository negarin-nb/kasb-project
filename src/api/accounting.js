import client from "./client";


const getTotalReport = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/financials/accounting/");
};

const getCostsReport = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/financials/accounting/costs/");
}

const getIncomesReport = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/financials/accounting/incomes/");
};

const getCash = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/financials/fund/");
}

const searchCategory = (token, type, text) => {
  console.log(type, text)
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/financials/search/category/?type=${type}&text=${text}`);
}
export default {
  getTotalReport,
  getCostsReport,
  getIncomesReport,
  getCash,
  searchCategory,
};

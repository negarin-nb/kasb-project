import client from "./client";


const getReport = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/financials/accounting/");
};

export default {
  getReport,
};

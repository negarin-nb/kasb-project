import client from "./client";

const getProFormaInvoice = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/orders/export/");
};


export default {
  getProFormaInvoice,
};
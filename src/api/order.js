import client from "./client";

const createOrder = (token, orderData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.post("/orders/order/", orderData);
};
const getOrderList = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/orders/order/");
};
const getOrderDetail = (token, id) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/orders/order/${id}/`);
};
const editOrder = (token, orderData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.put("/orders/order/", orderData);
};
const deleteOrder = (token, id) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.delete(`/orders/order/${id}`);
};

export default {
  createOrder,
  getOrderList,
  getOrderDetail,
  editOrder,
  deleteOrder,
};
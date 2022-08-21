import client from "./client";

const searchItem = (token, text) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/items/search/?type=item&text=${text}`);
};
const searchCustomer = (token, text) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/items/search/?type=customer&text=${text}`);
};
const searchLabel = (token, text) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/items/search/?type=label&text=${text}`);
};
const searchCategory = (token, text) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get(`/items/search/?type=category&text=${text}`);
};

export default {
  searchItem,
  searchCustomer,
  searchLabel,
  searchCategory,
};
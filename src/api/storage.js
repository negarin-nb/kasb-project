import client from "./client";

const storeItem = (token , itemData) => {
    client.setHeaders({ 'Authorization': `Bearer ${token}`});
    return client.post("/items/item/", itemData);
}

const getItems = (token) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  return client.get("/items/item/");
};

const updateItem = (token, itemData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  client.put("/items/item/", itemData);
};

const deleteItem = (token, itemData) => {
  client.setHeaders({ Authorization: `Bearer ${token}` });
  client.delete(`/items/item/${itemData.id}/`);
};

export default {
  storeItem,
  getItems,
  updateItem,
  deleteItem,
};
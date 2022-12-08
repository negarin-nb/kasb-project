import client from "./client";

const enter = (token, data) => {
  client.setHeaders({
    Authorization: `Bearer ${token}`,
  });
  return client.post("/reminders/reminder/", data);
};

const edit = (token, data) => {
  client.setHeaders({
    Authorization: `Bearer ${token}`,
  });
  return client.put("/reminders/reminder/", data);
};

const get = (token, dateNumFormat) => {
  client.setHeaders({Authorization: `Bearer ${token}`});
  return client.get(
    `/reminders/reminder/?filter_by=date&reminder_date=${dateNumFormat}`
  );
};

const del = (token, id) => {
  client.setHeaders({ Authorization: `Bearer ${token}`});
  return client.delete(`/reminders/reminder/${id}/`);
};

export default {
  enter,
  get,
  edit,
  del,
};

import client from "./client";

const enter = (token, formData, onUploadProgress) => {
  client.setHeaders({
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  });
  return client.post("/reminders/content/", formData, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  }); 
};

const edit = (token, formData) => {
  client.setHeaders({
    Authorization: `Bearer ${token}`
  });
  return client.put("/reminders/content/", formData);
};

const get = (token, dateNumFormat) => {
  client.setHeaders({
    Authorization: `Bearer ${token}`
  });
  return client.get(
    `/reminders/content/?filter_by=date&reminder_date=${dateNumFormat}`
  );
};

const del = (token, id) => {
  client.setHeaders({Authorization: `Bearer ${token}`});
  return client.delete(`/reminders/content/${id}/`);
};

export default {
    enter,
    get,
    edit,
    del,
}
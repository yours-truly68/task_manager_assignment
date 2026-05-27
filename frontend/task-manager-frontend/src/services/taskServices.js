import api from "../api/axios";

export const getTasks = async (sortBy, order) => {
  const response = await api.get("/tasks", {
    params: {
      sort_by: sortBy,
      order: order,
    },
  });

  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);

  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);

  return response.data;
};

export const getSingleTask = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);

  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);

  return response.data;
};

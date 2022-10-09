import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_DEV_URL });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`, id);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });

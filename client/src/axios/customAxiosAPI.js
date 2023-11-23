import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://192.168.18.189:5000/api/v1",
});

customAxios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    request.headers.Authorization = token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 440) {
      localStorage.clear();
      window.location.replace("http://192.168.18.189:3000/unauthorized");
    }
    return Promise.reject(error);
  }
);

export default customAxios;

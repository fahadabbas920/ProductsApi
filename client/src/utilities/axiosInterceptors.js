import axios from "axios";

const authfetch = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

authfetch.interceptors.request(
  (request) => {
    request.headers.common["Accept"] = "application/json";
    request.headers.authorization = "token";
    console.log("request sent");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
authfetch.interceptors.response(
  (response) => {
    console.log("Response recieved");
    return response;
  },
  (error) => {
    if (error.response.status === 440) {
      console.log("Not Authorized");
    }
    return Promise.reject(error);
  }
);

export default authfetch;

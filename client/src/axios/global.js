// import axios from "axios";

// const authfetch = axios.create({
//   baseURL: "http://localhost:5000",
// });

// authfetch.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 440) {
//       console.log("User not Authorized");
//       window.location.replace('http://localhost:3000/unauthorized')
//     }
//     return Promise.reject(error);
//   }
// );

// export default authfetch;

import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 440) {
      localStorage.clear();
      window.location.replace("http://localhost:3000/unauthorized");
    }
    return Promise.reject(error);
  }
);

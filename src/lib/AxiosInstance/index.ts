import axios from "axios";
import envConfig from "../../config/envConfig";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

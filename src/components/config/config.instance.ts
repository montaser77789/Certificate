import axios from "axios";

const axioInstance = axios.create({
  baseURL: "https://cert.spiltm.com",
});
export default axioInstance;

import axios from "axios";

const axioInstance = axios.create({
  baseURL: "https://ecommerce-backend-377z.onrender.com",
});
export default axioInstance;

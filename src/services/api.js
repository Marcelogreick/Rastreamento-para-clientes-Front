import axios from "axios";
import config from "../config/env.json";

const api = axios.create({
  baseURL: config.host_api,
});

export default api;

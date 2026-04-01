import axios from "axios";

const API = axios.create({
  baseURL: "https://express-track-glwy.onrender.com/api",
});

export default API;
import axios from "axios";
import {API_URL} from "./constants";

const gamestudioAxios = axios.create({
  baseURL: API_URL
});

export default gamestudioAxios;

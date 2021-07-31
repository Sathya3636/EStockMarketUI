import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44314/api/v1.0/market/",
  headers: {
    "Content-type": "application/json"
  }
});
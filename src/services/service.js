import axios from "axios";

export default axios.create({
  baseURL: "https://estockservice.azure-api.net/",
  headers: {
    "Content-type": "application/json",
    "Ocp-Apim-Subscription-Key": "3d71c59441b447b199314f8e049cf7df"
  }
});
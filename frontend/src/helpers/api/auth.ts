import { APICore } from "./apiCore";
import axios from "axios";
import { config } from "../../config";
const api = new APICore();

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = config.API_URL;
// account
function login(params: { userEmail: string; userPassword: string }) {
  const baseUrl = "/login/";
  return api.create(`${axios.defaults.baseURL}${baseUrl}`, params);
}

function logout() {
  const baseUrl = "/logout/";
  return api.get(`${axios.defaults.baseURL}${baseUrl}`, {});
}

function signup(params: {
  fullname: string;
  userEmail: string;
  userPassword: string;
}) {
  const baseUrl = "/register/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { userEmail: string }) {
  const baseUrl = "/forget-userPassword/";
  return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword };

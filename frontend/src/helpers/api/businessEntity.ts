import { APICore } from "./apiCore";
import { config } from "../../config";
import axios from "axios";
const api = new APICore();

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = config.API_URL;
// account
function rolePermissionApi(params: { businessEntityName: any }) {
  const baseUrl = "/beroleandpermissions/";
  return api.create(`${axios.defaults.baseURL}${baseUrl}`, params);
}

function logout() {
  const baseUrl = "/logout/";
  return api.create(`${baseUrl}`, {});
}

function signup(params: { fullname: string; email: string; password: string }) {
  const baseUrl = "/register/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { email: string }) {
  const baseUrl = "/forget-password/";
  return api.create(`${baseUrl}`, params);
}

export { rolePermissionApi, logout, signup, forgotPassword };

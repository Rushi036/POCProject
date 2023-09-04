import { config } from "../config";
const token = sessionStorage.getItem("token");
export const login = async (url: any, data: any) => {
  const res = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const res_data = await res.json();
  return res_data;
};

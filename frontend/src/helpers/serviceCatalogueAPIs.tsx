import { config } from "../config";
const token = sessionStorage.getItem("token");

export const addService = async (props: any) => {
  // console.log(props);
  const res = await fetch(`${config.API_URL}/addservice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(props),
  });
  return res.status;
  // console.log(res);
};

export const fetchSingleService = async (id: any) => {
  const res = await fetch(`${config.API_URL}/getsingleservice/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const fetchServices = async () => {
  const res = await fetch(`${config.API_URL}/getallservices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

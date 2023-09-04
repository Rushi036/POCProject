import { config } from "../config";
const token = sessionStorage.getItem("token");

export const fetchbeUsers = async (props: any) => {
  const res = await fetch(`${config.API_URL}/findbeusers/${props}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const fetchsingleUsers = async (props: any) => {
  const res = await fetch(`${config.API_URL}/getsingleuser/${props}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const addUser = async (props: any) => {
  console.log(props);
  const res = await fetch(`${config.API_URL}/register`, {
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

export const updateUser = async (id: string, data: any) => {
  console.log(id, data);
  const res = await fetch(`${config.API_URL}/userupdate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.status;
  // console.log(res);
};

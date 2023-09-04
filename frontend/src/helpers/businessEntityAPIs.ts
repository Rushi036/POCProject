import { config } from "../config";
const token = sessionStorage.getItem("token");
export const fetchallBE = async () => {
  const res = await fetch(`${config.API_URL}/getallbe`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const addBE = async (props: any) => {
  const res = await fetch(`${config.API_URL}/addbusinessentity`, {
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

export const fetchSingleBE = async (props: any) => {
  const res = await fetch(`${config.API_URL}/individualbebyid/${props}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
  // console.log(res);
};

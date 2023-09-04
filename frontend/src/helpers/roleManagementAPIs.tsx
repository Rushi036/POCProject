import { config } from "../config";
const token = sessionStorage.getItem("token");
export const fetchBeRoles = async (props: any) => {
  const response = await fetch(`${config.API_URL}/beroles/${props}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const newData = await response.json();
  return newData;
};

export const fetchrolesandpermission = async (props: any) => {
  const res = await fetch(
    `${config.API_URL}/beroleandpermissions/${props.businessEntityName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(props),
    }
  );
  const newData = await res.json();
  return newData;
};

export const addRole = async (props: any) => {
  const res = await fetch(`${config.API_URL}/addrole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(props),
  });
  return res.status;
};

export const updateRolePermission = async (id: string, data: any) => {
  console.log(id, data);
  const res = await fetch(`${config.API_URL}/updaterole/${id}`, {
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

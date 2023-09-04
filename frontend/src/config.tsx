export const config = {
  API_URL: "http://localhost:5000/api",
};
const userDetails = JSON.parse(sessionStorage.getItem("User")!);
console.log("Userdeyails", JSON.parse(sessionStorage.getItem("User")!));

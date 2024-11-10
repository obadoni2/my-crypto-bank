import axios from "axios";

export default axios.create({
  withCredentials: true,
  // headers: {
  //   Authorization: "Bearer " + localStorage.getItem("token"),
  //   "Access-Control-Allow-Origin": "*",
  // },
});

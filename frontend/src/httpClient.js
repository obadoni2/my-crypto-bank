import axios from "axios";

export default axios.create({
    withCredentials:true,
    // header:{
     // Authorization "bearer" + localStorage.getItem("token")
     
   // }
});
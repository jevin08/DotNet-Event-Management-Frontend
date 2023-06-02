import axios from "axios";
import Notify from "./toast";

export default function setAuthToken(token){
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}
export const APP_API = `https://localhost:7283`;

export const checkUserIsLoggedIn = ()=>{
    if (!localStorage.getItem('token')) {
        Notify({ message: `Please login first.`, type: "info" });
        return false;
    }
    return true;
}
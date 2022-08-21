import axios from "axios";
import { base_url } from "./Baseurl";

export const API = axios.create({baseURL:base_url})

API.interceptors.request.use((req)=>{

    if(localStorage.getItem("access_token")){

        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`

    }

    return req

});
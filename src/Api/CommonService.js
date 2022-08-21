import { API } from "./Interceptors";



const create =(url,data)=> API.post(url,data);
const getData = (url)=>API.get(url);
const getAllData = (url,data)=>API.post(url,data);
const updateProfile= (url,data)=> API.patch(url,data);
const deleteUserProfile= (url)=> API.delete(url);
const deleteItem = (url,data)=> API.post(url,data);

export {create,getData,updateProfile,deleteUserProfile,getAllData,deleteItem};
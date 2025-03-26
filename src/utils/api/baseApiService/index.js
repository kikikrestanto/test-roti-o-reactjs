import axios from "axios";
import apiUrl from "../baseUrl";

export const serviceListData = (payload) => 
    axios.post(`${apiUrl}/list-data`, payload);

export const serviceDeleteData = (payload) => 
    axios.post(`${apiUrl}/delete-data/${payload}`);

export const serviceAddData = (payload) => 
    axios.post(`${apiUrl}/add-data`, payload);
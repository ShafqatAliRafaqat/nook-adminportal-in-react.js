import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_DASHBOARD = "GET_DASHBOARD";

export const getData = (token) => {
    return axios.get(APIModel.HOST + "admin/dashboard", {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};
import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_NOTICE = "GET_NOTICE";
export const UPDATE_NOTICE = "UPDATE_NOTICE";
export const getNotices = (token,search) => {
  return axios.get(APIModel.HOST + "admin/notices" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const updateNotice = (token,id,data) => {
  return axios.put(APIModel.HOST + "admin/notices/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

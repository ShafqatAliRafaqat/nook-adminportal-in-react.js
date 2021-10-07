import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_BOOKINGS = "GET_BOOKINGS";
export const UPDATE_BOOKING = "UPDATE_BOOKING";
export const CREATE_BOOKING = "CREATE_BOOKING";

export const getBookings = (token,search) => {
  return axios.get(APIModel.HOST + "admin/bookings" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const generateReceipt = (token,data) => {
  return axios.post(APIModel.HOST + "admin/receipts",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const addSecurity = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/bookings/addSecurity/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editBooking = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/bookings/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
export const createBooking = (token,data) => {
  return axios.post(APIModel.HOST + "admin/bookings",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
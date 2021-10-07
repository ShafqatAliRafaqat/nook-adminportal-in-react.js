import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_ROOM_SHIFTS = "GET_ROOM_SHIFTS";
export const UPDATE_ROOM_SHIFTS = "UPDATE_ROOM_SHIFTS";

export const updateRoomShift = (token,id,data) => {
  return axios.post(APIModel.HOST + "admin/room_shifts/"+id,data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getRoomShifts = (token,search) => {
  return axios.get(APIModel.HOST + "admin/room_shifts" +search,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
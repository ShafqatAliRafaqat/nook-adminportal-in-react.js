import * as actions from "../Actions/RoomShiftsActions";

const initSate = {
  room_shifts : []
};

const RoomShiftsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_ROOM_SHIFTS: {
      return { ...state, room_shifts: action.payload };
    }
    case actions.UPDATE_ROOM_SHIFTS: {
      let room_shift = action.payload;
      let room_shifts = state.room_shifts.map( t => {
        if(t.id === room_shift.id){
          return {...room_shift}
        }
        return {...t}
      });
      return { ...state, room_shifts };
    }
  }
  return state;
};

export default RoomShiftsReducer;

import * as actions from "../Actions/ShiftsActions";

const initSate = {
  shifts : []
};

const ShiftsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_SHIFTS: {
      return { ...state, shifts: action.payload };
    }
    case actions.UPDATE_SHIFTS: {
      let shift = action.payload;
      let shifts = state.shifts.map( t => {
        if(t.id === shift.id){
          return {...shift}
        }
        return {...t}
      });
      return { ...state, shifts };
    }
  }
  return state;
};

export default ShiftsReducer;

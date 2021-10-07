import * as actions from "../Actions/BookingActions";

const initSate = {
  bookings : []
};

const BookingsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_BOOKINGS: {
      return { ...state, bookings: action.payload };
    }
    case actions.CREATE_BOOKING: {
      return { ...state, bookings: [{...action.payload},...state.bookings] };
    }
    case actions.UPDATE_BOOKING: {
      let booking = action.payload;
      let bookings = state.bookings.map( t => {
        if(t.id === booking.id){
          return {...booking}
        }
        return {...t}
      });
      return { ...state, bookings };
    }
  }
  return state;
};

export default BookingsReducer;

import * as actions from "../Actions/ComplainActions";

const initSate = {
  complains : []
};

const ComplainsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_COMPLAINS: {
      return { ...state, complains: action.payload };
    }
    case actions.CREATE_COMPLAINS: {
      return { ...state, complains: [{...action.payload},...state.complains] };
    }
    case actions.EDIT_COMPLAINS: {
      let complain = action.payload;
      let complains = state.complains.map( v => {
        if(v.id === complain.id){
          return {...complain}
        }
        return {...v}
      });
      return { ...state, complains };
    }
    case actions.UPDATE_COMPLAINS: {
      let complain = action.payload;
      let complains = state.complains.map( t => {
        if(t.id === complain.id){
          return {...complain}
        }
        return {...t}
      });
      return { ...state, complains };
    }
  }
  return state;
};

export default ComplainsReducer;

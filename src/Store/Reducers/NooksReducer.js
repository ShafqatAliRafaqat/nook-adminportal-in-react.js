import * as actions from "../Actions/NookActions";

const initSate = {
  nooks : []
};

const NooksReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_NOOKS: {
      return { ...state, nooks: action.payload };
    }
    case actions.CREATE_NOOK: {
      return { ...state, nooks: [{...action.payload},...state.nooks] };
    }
    case actions.EDIT_NOOK: {
      let nook = action.payload;
      let nooks = state.nooks.map( v => {
        if(v.id === nook.id){
          return {...nook}
        }
        return {...v}
      });
      return { ...state, nooks };
    }
  }
  return state;
};

export default NooksReducer;

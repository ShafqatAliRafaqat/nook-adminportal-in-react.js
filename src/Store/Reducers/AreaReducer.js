import * as actions from "../Actions/AreaActions";

const initSate = {
  areas : []
};

const AreaReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_AREA: {
      return { ...state, areas: action.payload };
    }
    case actions.CREATE_AREA: {
      return { ...state, areas: [{...action.payload},...state.areas] };
    }
    case actions.EDIT_AREA: {
      let area = action.payload;
      let areas = state.areas.map( a => {
        if(a.id === area.id){
          return {...area}
        }
        return {...a}
      });
      return { ...state, areas };
    }
    case actions.DELETE_AREA: {
      let areas = state.areas.filter( a => a.id !== action.payload);
      return { ...state, areas: areas };
    }
  }
  return state;
};

export default AreaReducer;

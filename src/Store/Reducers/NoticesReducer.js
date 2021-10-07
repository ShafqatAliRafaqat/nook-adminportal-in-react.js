import * as actions from "../Actions/NoticeActions";

const initSate = {
  notices : []
};

const NoticesReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_NOTICE: {
      return { ...state, notices: action.payload };
    }
    case actions.UPDATE_NOTICE: {
      let notice = action.payload;
      let notices = state.notices.map( t => {
        if(t.id === notice.id){
          return {...notice}
        }
        return {...t}
      });
      return { ...state, notices };
    }
  }
  return state;
};

export default NoticesReducer;

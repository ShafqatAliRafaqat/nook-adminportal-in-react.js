import * as actions from "../Actions/DashboardActions";

const initSate = {
    data: []
};

const DashBoardReducer = (state = initSate, action) => {
    switch (action.type) {
        case actions.GET_DASHBOARD:
            {
                return {...state, data: action.payload };
            }
    }
    return state;
};

export default DashBoardReducer;
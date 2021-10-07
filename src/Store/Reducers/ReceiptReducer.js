import * as actions from "../Actions/ReceiptActions";

const initSate = {
  receipts : []
};

const ReceiptReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_RECEIPTS: {
      return { ...state, receipts: action.payload };
    }
    case actions.PAY_RECEIPT: {
      let receipt = action.payload;
      let receipts = state.receipts.map( t => {
        if(t.id === receipt.id){
          return {...receipt}
        }
        return {...t}
      });
      return { ...state, receipts };
    }
    case actions.UPDATE_RECEIPT: {
      let receipt = action.payload;
      let receipts = state.receipts.map( r => {
        if(r.id === receipt.id){
          return {...receipt}
        }
        return {...r}
      });
      return { ...state, receipts };
    }
    case actions.DELETE_RECEIPT: {
      let receipts = state.receipts.filter( r => r.id !== action.payload);
      return { ...state, receipts: receipts };
    }
  }
  return state;
};

export default ReceiptReducer;

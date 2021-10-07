import * as actions from "../Actions/GetTransactionsActions";

const initSate = {
  transactions : []
};

const TransactionsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_TRANSACTIONS: {
      return { ...state, transactions: [...action.payload] };
    }
    case actions.UPDATE_TRANSACTIONS: {
      let transaction = action.payload;
      let transactions = state.transactions.map( t => {
        if(t.id === transaction.id){
          return {...transaction}
        }
        return {...t}
      });
      return { ...state, transactions };
    }
  }
  return state;
};

export default TransactionsReducer;

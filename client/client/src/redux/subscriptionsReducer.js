
// Subscriptions initial state
const initialSubscriptionsState = {  
  subscriptions: [], 
};

// Subscriptions Reducer
const subscriptionsReducer = (state = initialSubscriptionsState, action) => {
  switch (action.type) {
    case 'GET_SUBSCRIPTION': {
      return { ...state, subscriptions: action.payload };
    }

    case 'ADD_SUBSCRIPTION': {
      return {
        ...state,
        subscriptions: [
          ...state.subscriptions,
          { ...action.payload },
        ],
      };
    }
    case 'REMOVE_SUBSCRIPTION': {
      const subscriptions = state.subscriptions.filter(
        (sub) => sub._id !== action.payload
      );
      return { ...state, subscriptions };
    }
    default:
      return state;
  }
};

export default subscriptionsReducer;

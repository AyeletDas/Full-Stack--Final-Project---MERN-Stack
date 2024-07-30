// Movies
const doGetMovies = (mov) => {
  return {
    type: 'GET_MOVIE',
    payload: mov,
  };
};

const doAddMovie = (mov) => {
  return {
    type: 'ADD_MOVIE',
    payload: mov,
  };
};

const doRemoveMovie = (movId) => {
  return {
    type: 'REMOVE_MOVIE',
    payload: movId,
  };
};

// Subscriptions
const doGetSubscriptions = (subs) => {
  return {
    type: 'GET_SUBSCRIPTION',
    payload: subs,
  };
};

const doAddSubscription = (sub) => { 
  return {
    type: 'ADD_SUBSCRIPTION',
    payload: sub,
  };
};

const doRemoveSubscription = (subId) => { 
  return {
    type: 'REMOVE_SUBSCRIPTION',
    payload: subId,
  };
};


export { doRemoveMovie, doAddMovie, doGetMovies, doGetSubscriptions, doAddSubscription, doRemoveSubscription };

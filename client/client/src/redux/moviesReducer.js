
// Movies initial state
const initialMoviesState = {  
  movies: [],
};

// Movies Reducer
const moviesReducer = (state = initialMoviesState, action) => {
  switch (action.type) {
    case 'ADD_MOVIE': {
      return {
        ...state,
        movies: [
          ...state.movies,
          {  ...action.payload },
        ],
      };
    }

    case 'REMOVE_MOVIE': {
      const movies = state.movies.filter(
        (mov) => mov._id !== action.payload
      );
      return { ...state, movies };
    }

    case 'GET_MOVIE': {
      return { ...state, movies: action.payload };
    }

    default:
      return state;
  }
};

export default moviesReducer;

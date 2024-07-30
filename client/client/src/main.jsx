import ReactDOM from 'react-dom/client'; // Render the application into the page
import { BrowserRouter } from 'react-router-dom'; // Navigation management
import App from './App.jsx'; // The main component containing all the child components
import { Provider } from 'react-redux'; // Wraps the application and provides the store for all child components
import { legacy_createStore as createStore } from 'redux'; // Create a store 
import reducer from './redux/rootReducer.js'; // Import the reducer defined in the file


const store = createStore(reducer); // Create the store with the reducer defined in the rootReducer.js file


// Render the application:
ReactDOM.createRoot(document.getElementById('root')).render( // Creates a main rendering point (root)
  <Provider store={store}>  {/* provides the store for all child components */}
    <BrowserRouter>  {/* must for the paths */}
      <App /> {/* The main component of the application that contains all the child components.*/}
    </BrowserRouter>
  </Provider>
);


// TERMINAL =  $ cd client -- > $ npm run dev


import { useNavigate } from 'react-router-dom';
import LogIn from '../mainPages/MainPageLogIn';

const LogOut = () => {
  const navigate = useNavigate();
  
  const BackToLogIn = ()=> {
    navigate('/')
  }

  return (
    <>

      <h1>Log Out</h1>
      <button onClick={BackToLogIn}> Back To Log In Page</button>
    </>
  );
};

export default LogOut;


import 'bootstrap/dist/css/bootstrap.min.css'
import Clock from "./components/LogInComponents/LogInForm/clock"
import LoginForm from "./components/LogInComponents/LogInForm/loginForm";
import {connect} from "react-redux";
import MainPage from "./components/LogInComponents/MainPage/mainPage";
import {initializeAuth} from "./store/reducers/authReducer";
import {useEffect, useState} from "react";

function App(props) {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      props.initializeAuth();
      setIsLoaded(true);
    }
  }, [isLoaded, props]);

  if (props.loggedUser === "")
  return (
      <div className={"container-fluid align-center h-90"}>
        <Clock/>
        <div className="row">
          <LoginForm/>
        </div>
      </div>
  );
  else {
    return(
        <div className={"container-fluid align-center h-90"}>
          <div className="row">
            <MainPage/>
          </div>
        </div>
      )

  }
}

export default connect(state =>{
  return {
    loggedUser: state.auth.loggedUser
  }
},
  dispatch => {
  return {
    initializeAuth : () => dispatch(initializeAuth())
  }
  })(App)

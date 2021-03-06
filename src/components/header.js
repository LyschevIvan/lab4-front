import {connect} from "react-redux";
import {logout} from "../store/reducers/authReducer";
import {Button} from "primereact/button";

function Header(props){


  return(
    <div className="header d-flex justify-content-between">
      <h1 >Лыщев Иван Антонович P3210 10876</h1>
      <div className={"p-1"}>
        {
          (props.loggedUser !== "") &&
          <Button className={"btn-block"} onClick={() => props.logout()} >
            Выход
          </Button>
        }
      </div>
    </div>
  )
}
function mapStateToProps(state){
  return{
    loggedUser: state.auth.loggedUser
  }
}
function mapDispatchToProps(dispatch){
      return{
        logout: () => dispatch(logout())
      }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)





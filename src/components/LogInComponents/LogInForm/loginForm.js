import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";

import {useFormik} from "formik";
import {login, register} from "../../../store/reducers/authReducer";
import {connect} from "react-redux";
import {ErrorAlert} from "./Alert";
import {ToggleButton} from "primereact/togglebutton";
import {Button} from "primereact/button";

const validate = values => {
  const errors = {};

  if (!values.login && !values.psw) {
    errors.errorMessage = 'Введите данные для авторизации в поля ниже.';
  }
  else{
    if (!values.login) {
      errors.errorMessage = 'Имя пользователя не может быть пустым.';
    }
    if (!values.psw) {
      errors.errorMessage = 'Пароль не может быть пустым.';
    }
  }

  return errors;
};

function LoginForm(props){


  const formik = useFormik({
    initialValues:{
      login : "",
      psw : "",
      reg : false
    },
    validate,
    onSubmit : values => {
      if (values.reg){
        props.register(values.login, values.psw)
      }
      else {
        props.login(values.login, values.psw)
      }
      // console.log(values.login)


    },
    validateOnBlur : false,
    validateOnChange : false,
  })

  return(
    <div>

      <ErrorAlert className={"row mx-auto col-4 my-3"} message = {formik.errors.errorMessage
        ? formik.errors.errorMessage
        : props.serverError
          ? props.serverError
          : ""}/>
      <form className="row mx-auto col-4" onSubmit={formik.handleSubmit}>
        <span >
          <h6>Login:</h6>
          <InputText name = "login"  onChange = {formik.handleChange} value = {formik.values.login}
          />
        </span>
        <span className={"py-3"}>
          <h6>Password:</h6>
        <Password feedback={false} name={"psw"}  onChange={formik.handleChange} value={formik.values.psw}/>
        </span>
        <span className={"d-flex justify-content-around"}>
          <Button type={"submit"}>Войти</Button>

        </span>
        <span className={"d-flex mt-3"}>
          <label className={"me-3"}>
            Новый аккаунт?
          </label>
        <ToggleButton className={"p-button-sm"} name = {"reg"} checked={formik.values.reg} onChange={formik.handleChange} />

        </span>

      </form>
    </div>
  )
}

function mapStateToProps(state){
  return{
    serverError : state.auth.serverError
  }
}
function mapDispatchToProps(dispatch){
  return{
    login : (username, password) => dispatch(login(username,password)),
    register : (username, password) => dispatch(register(username,password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
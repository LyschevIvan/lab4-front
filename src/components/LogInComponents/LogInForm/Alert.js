import { Alert } from '@material-ui/lab';
export const ErrorAlert = (props) =>{

  return(
    props.message&&
      <Alert className={props.className} variant="outlined" severity="error">{props.message}</Alert>

  )


}
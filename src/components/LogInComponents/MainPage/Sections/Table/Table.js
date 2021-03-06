import {DataTable} from "primereact/datatable";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {removeEntry} from "../../../../../store/reducers/tableReducer";

const Table = (props) => {



  function remove(id){

    props.removePoint(id)
  }
  const removeBody =  (rowData) => {
    return(
          <Button className={"p-button-rounded p-button-sm"} onClick={()=>remove(rowData.id)}>
            Удалить
          </Button>
      )
  }

  const isInBody = (rowData) => {
    if (rowData.isIn === "true"){
      return(
        <label style={{color : "green" , fontSize:  "85%"}}>
          внутри
        </label>
      )
    }
    else {
      return(
        <label style={{color : "red", fontSize:  "85%"}}>
          снаружи
        </label>
      )
    }
  }

  return(

      <DataTable value={props.points} className="p-datatable-gridlines" scrollable resizableColumns  columnResizeMode="fit" >
        <Column field={"x"} header={"X"} style={{width: "20%"}} className={"text-center"}/>
        <Column field={"y"} header={"Y"} style={{width: "20%"}} className={"text-center"}/>
        <Column field={"r"} header={"R"} style={{width: "10%"}} className={"text-center"}/>
        <Column header={"Result"} body={isInBody} style={{width: "22%"}} className={"text-center"}/>
        <Column body={removeBody} style={{width: "28%"}} className={"text-center"}/>

      </DataTable>


  )
}

function stateToProps(state){
  return{
    points : state.table.points
  }
}

function dispatchToProps(dispatch){
  return{
    removePoint : (id) => dispatch(removeEntry(id))
  }
}

export default connect(
  stateToProps,dispatchToProps
)(Table)

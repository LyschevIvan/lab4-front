import {PicSection} from "./Sections/Canvas/picSection";
import FormSection from "./Sections/MainForm/FormSection";
import {TableSection} from "./Sections/Table/TableSection";


const MainPage = (props) =>{
  return(
    <div className={"row"}>
      <PicSection/>
      <FormSection/>
     <TableSection/>
    </div>

  )
}

export default MainPage
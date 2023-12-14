import AddClient from "./AddClient.jsx"
import AddProject from "./AddProject.jsx"

export default function AddBtnGroup(){
  return(
    <div className="d-flex gap-3">
    <AddClient/>
    <AddProject/>
    </div>
    )
}
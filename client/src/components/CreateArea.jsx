import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [input, setInput] = useState({
    title: "",
    content: "",
  })
  const [isExpanded, setExpanded] = useState(false)

  function handleChange(event){
    const {name, value} = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  function handleSubmit(event){
    props.onAdd(input, event)
    setInput({title:"", content:""})
  }

  function expand(){
    setExpanded(true)
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        {isExpanded && <input onChange={handleChange} name="title" placeholder="Title" value={input.title}/>}
        <textarea onChange={handleChange} onClick={expand} name="content" placeholder="Take a note..." rows={isExpanded?3:1} value={input.content}/>
        <Zoom in={isExpanded}>
          <Fab type="submit"><AddIcon /></Fab>
        </Zoom>        
      </form>
    </div>
  );
}

export default CreateArea;

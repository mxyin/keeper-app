import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchData()
  },[])

  function addNote(note,event) {
    postRequest(note);
    event.preventDefault();
  }
  
  function fetchData() {
    fetch(`/notes`)
    .then(function(response){
      console.log("The response is: ")
      console.log(response)
      return response.json();
    })
    .then(function(data){
        setNotes(data);
        console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function postRequest(note) {
    fetch(`/notes`,{
      method: "post",
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      setNotes((prevNotes) => [...prevNotes ,data]);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function deleteRequest(id) {
    console.log(id);
    fetch(`/notes/${id}`, {
      method: "delete"
    })
    .then(function(){
      console.log("fetched delete request")
      fetchData()
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote}/>
      {notes.map(function(note, index){
        return <Note key={index} id={note._id} title={note.title} content={note.content} onDelete={deleteRequest}/>
      })}
      <Footer />
    </div>
  );
}

export default App;

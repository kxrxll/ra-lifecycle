import React, {useState, useEffect} from 'react';
import './bootstrap.css';
import Note from './Note';
import { nanoid } from 'nanoid';

function Notes() {
  const [notes, setNotes] = useState();

  const getList = async () => {
    fetch('http://localhost:7777/notes')
    .then(function (response) {
      response.json().then(function (data) {
        return data;
      })
    })
  }

  console.log((getList().resolve()), 'here!');

  async function sendItem(url, data) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const gatheredNotes = getList();
    setNotes(gatheredNotes);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const value = evt.target.querySelector('.form-control').value;
    sendItem('http://localhost:7777/notes', {id:nanoid(), content: value})
  }

  return (
    <div>
      <div className="card col-6" style={{
          margin:'20px',
          padding:'20px',
          backgroundColor:'beige'
        }}>
        <h2>Заметки</h2>
        <form className="mb-3" onSubmit={handleSubmit}>
          <input required type="text" className="form-control" id="exampleFormControlInput1"
          placeholder="Новая заметка" />
        </form>
        <button className="btn btn-info" type="submit" onClick={getList}>Обновить</button>
      </div>
      <div style={{display:'flex', flexWrap:'wrap'}} className='col-6'>
      {notes ? notes.map(item => <Note  item={item} key={nanoid()} />) : false}
      </div>
    </div>
  )
}

export default Notes;
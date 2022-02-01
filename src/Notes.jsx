import React, {useState, useEffect} from 'react';
import './bootstrap.css';
import Note from './Note';
import { nanoid } from 'nanoid';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  async function getList() {
    const response = await fetch('http://localhost:7777/notes');
    if (response.ok) {
      const result = await response.json();
      return await result;
    }
  }

  async function deleteItem(id) {
    await fetch(`http://localhost:7777/notes/${id}`, {method: 'DELETE'});
    getList().then((result) => setNotes(result));
  }

  useEffect(() => {
    getList().then((result) => setNotes(result));
  }, []);

  async function sendItem(url, data) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    getList().then((result) => setNotes(result));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendItem('http://localhost:7777/notes', {id:nanoid(), content: input})
    setInput('');
    evt.target.reset();
  }

  const handleInput = (evt) => {
    evt.preventDefault();
    setInput(evt.target.value);
  }

  const handleDelete = (evt) => {
    evt.preventDefault();
    deleteItem(evt.target.id);
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
          placeholder="Новая заметка"
          onChange={handleInput} />
        </form>
        <button className="btn btn-info" type="submit" onClick={getList}>Обновить</button>
      </div>
      <div style={{display:'flex', flexWrap:'wrap'}} className='col-6'>
      {notes ? notes.map(item => <Note  item={item} key={nanoid()} onDelete={handleDelete}/> ) : false}
      </div>
    </div>
  )
}

export default Notes;
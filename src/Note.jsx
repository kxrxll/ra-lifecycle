import React from 'react';
import './bootstrap.css';

function Note({item, onDelete}) {
  return (
    <div className='watch'>
      <div className="card" style={{marginLeft:'35px', marginTop:'20px'}}>
        <div className="card-body">
          <p className="card-text">{item.content}</p>
          <button type="button" className="btn btn-danger" id={item.id} onClick={onDelete}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default Note;

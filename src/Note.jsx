import React from 'react';
import './bootstrap.css';

function App() {
  return (
    <div className='watch'>
      <div className="card" style={{marginLeft:'35px', marginTop:'20px'}}>
        <div className="card-body">
          <p className="card-text">Hello!</p>
          <button type="button" className="btn btn-danger">Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default App;

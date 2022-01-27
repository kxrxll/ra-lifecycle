import React, {useState} from 'react';
import './bootstrap.css';
import Watch from './Watch';
import 'nanoid';
import { nanoid } from 'nanoid';

function Watches() {
  const [watchArr, setWatchArr] = useState([]);
  const [name, setName] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const timeZoneParsed = parseInt(timeZone);
    if (timeZoneParsed < -12 || timeZoneParsed > 14) {
      alert('Time zone error');
      return;
    }
    setWatchArr([...watchArr, {name: name, timeZone: timeZoneParsed}]);
    evt.target.reset();
  }
  const handleDelete = (id) => {
    setWatchArr(watchArr.filter(item => item.name !== id))
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="card col-6" style={{
          margin:'20px',
          padding:'20px',
          backgroundColor:'beige'
        }}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Название</label>
          <input required type="text" className="form-control" id="exampleFormControlInput1"
          onChange={(e) => setName(e.target.value)}
          placeholder="Название ваших часов" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Временная зона</label>
          <input required type="text" className="form-control" id="exampleFormControlInput2"
          onChange={(e) => setTimeZone(e.target.value)}
          placeholder="Временная зона ваших часов в формате '+N'" />
        </div>
        <button className="btn btn-primary" type="submit">Добавить</button>
      </form>
      <div style={{display:'flex', flexWrap:'wrap'}} className='col-6'>
        {watchArr.map(item => <Watch  item={item} key={nanoid()} onDelete={handleDelete}/>)}
      </div>
    </div>
  )
}

export default Watches;

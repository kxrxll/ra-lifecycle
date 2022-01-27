/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import './bootstrap.css';
import moment from 'moment';

function Watch({item, onDelete}) {
  const id = item.name;
  const [time, setTime] = useState(moment().subtract(-item.timeZone, 'hours').format(`h:mm:ss`));
  let timer;
  useEffect(() => {
    timer = setTimeout(() => {
      setTime(moment().subtract(-item.timeZone, 'hours').format(`h:mm:ss`));
    }, 1000);
  }, [])
  useEffect(() => {
    timer = setTimeout(() => {
      setTime(moment().subtract(-item.timeZone, 'hours').format(`h:mm:ss`));
      console.log('Bup!');
    }, 1000);
  }, [time])
  useEffect(() => {
    return () => {
        clearTimeout(timer);
    }
  }, [])
  return (
    <div className='watch'>
      <div className="card" style={{marginLeft:'35px', marginTop:'20px'}}>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <h6 className="card-text">{time}</h6>
          <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default Watch;

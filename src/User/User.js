import { intToStringTime, firebaseConfig, stringToIntTime } from '../utils';
import './User.css'
import React, { useState } from 'react';
import { getDatabase, ref, set, child, push, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, Firestore, collection} from 'firebase/firestore';


function User() {
  const [empty, setEmpty] = useState([]);
  const [memberNumber, setMemberNumber] = useState('');
  const [numAtTable, setNumAtTable] = useState('');
  const [seatPref, setSeatPref] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [open, setOpen] = useState('11:00 AM');
  const [close, setClose] = useState('8:00 PM');
  
  React.useEffect(function () {
    const emptyRep = [...empty];
    for (let i = stringToIntTime[open]; i < stringToIntTime[close]; i++) {
      emptyRep.push(intToStringTime[i]);
    }
    setEmpty(emptyRep)
  },[])

 

  async function booko() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const newCityRef = doc(collection(db, "res"));

    await setDoc(newCityRef, {
      table_num: 2,
      time,
      date: new Date().toDateString(),
      location: seatPref,
      mem_num: memberNumber
    });

  }

  return (
    <div className="main">
      <p style={{fontSize: "38px", width: "380px", lineHeight: '40px', position: 'absolute', color: 'rgb(222, 255, 222)', zIndex: "100000", marginTop: '20px', height: "40px", opacity: "100%" }}>Moorestown Field Club Restaurant Reservation</p>
      <div id="sub_main">
        <p style={{width: '360px', paddingLeft: '20px'}} id="welcome">Welcome to the Moorestown Field Club Restaurant Table Reservation Center. Follow the presented instructions to reserve your table at a time convenient to you. We hope to see you soon!</p>
        <div id="cool">
        <input value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} placeholder="Member Number" className={'inny'}/>
        <input value={numAtTable} onChange={(e) => setNumAtTable(e.target.value)} placeholder="Number at Table" className='inny'/>
        <select value={seatPref} onChange={(e) => setSeatPref(e.target.value)} className={"inny"} style={{fontSize: '18px', paddingLeft: "6px"}}>
          <option>Seating Preference</option>
          <option>No Preference</option>
          <option>Sunroom</option>
          <option>Outside</option>
          <option>Inside</option>
        </select>
        <select value={time} onChange={(e) => setTime(e.target.value)} className='inny'>
            <option>Choose Time</option>
            {empty.map(e => {
              return <option>{e}</option>
            })}
        </select>
        <input onChange={(e) => setDate(e.target.value)} value={date} className='inny' placeholder='Choose Date' type='date'/>
        <button onClick={booko} style={{height: '40px', cursor: 'pointer', alignSelf: 'center', marginLeft: '-35px', fontSize: "22px", width: "200px", border: '2px solid black'}}>Book Reservation</button>
        </div>
      </div>
      <div className="cover">
     </div>
    </div>
  );
}

export default User;

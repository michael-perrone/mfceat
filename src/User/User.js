import { intToStringTime, firebaseConfig, stringToIntTime } from '../utils';
import './User.css'
import React, { useState } from 'react';
import { getDatabase, ref, set, child, push, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, Firestore, collection} from 'firebase/firestore';
import {getDocs, where} from 'firebase/firestore';
import { getDoc, query } from "firebase/firestore";
import DateDrop from '../BookingHelpers/DateDrop/DateDrop';
import {withRouter} from 'react-router-dom';

function User(props) {
  const [empty, setEmpty] = useState([]);
  const [memberNumber, setMemberNumber] = useState('');
  const [numAtTable, setNumAtTable] = useState('');
  const [seatPref, setSeatPref] = useState('');
  const [date, setDate] = useState(new Date().toDateString());
  const [time, setTime] = useState('');
  const [open, setOpen] = useState('11:00 AM');
  const [close, setClose] = useState('8:00 PM');
  const [reservations, setReservations] = useState([]);
  const [tableNum, setTableNum] = useState('');
  const tables = 13;
  

  function goToTakeout() {
    props.history.push('/takeout')
  }
  
  React.useEffect(function () {
    const emptyRep = [...empty];
    for (let i = stringToIntTime[open]; i < stringToIntTime[close]; i++) {
      emptyRep.push(intToStringTime[i]);
    }
    setEmpty(emptyRep)
  },[])

  React.useEffect(function() {
    setReservations([]);
    const reservationsCopy = [];
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let dater = "";
    const dateArr = date.split('-');
    if (dateArr.length > 1) {
      console.log("hello?")
        dateArr[2] = parseInt((dateArr[2])) + 1;
        dateArr[2] = dateArr[2].toString();
        dater = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2];
    }
    else {
      dater = date;
    }
   
    let datey = new Date(dater).toDateString();
    console.log(datey);
    const q = query(collection(db, 'res'), where('date', '==',  datey));
    getDocs(q).then(response => {
        response.forEach(el => {
            reservationsCopy.push(el.data());
        })
        const newArr = [];
        for (let i = 0; i < tables; i++) {
            newArr.push([]);
        }  
        console.log(reservationsCopy.length)
        for (let t = 0; t < reservationsCopy.length; t++) {
           newArr[reservationsCopy[t].table_num - 1].push(reservationsCopy[t]);
        }
        setReservations(newArr);
    })
  }, [date])

 

  async function booko() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let tnum;

    const newCityRef = doc(collection(db, "res"));
    
    let passed = false;
    console.log(reservations.length);
    for (let i = 0; i < reservations.length; i++) {
      console.log(reservations[i], i);
      if (reservations[i].length === 0) {
       tnum = i + 1;
        passed = true;
        break;
      }
    }
    if (!passed) {
      for (let i = 0; i < reservations.length; i++) {
        const nums = [];
        for (let t = 0; t < reservations[i].length; t++) {
          console.log("hi?")
          for (let z = 0; z < 18; z++) {
            nums.push(stringToIntTime[reservations[i][t].time] + z);
          }
        }
      console.log(nums);
      }
    }
    
    await setDoc(newCityRef, {
      table_num: tnum,
      time,
      date: date,
      location: seatPref,
      mem_num: memberNumber,
      numAtTable: parseInt(numAtTable),
      id: newCityRef.id,
    });
  }



  return (
    <div className="main">
      <p style={{fontSize: "38px", width: "380px", lineHeight: '40px', position: 'absolute', color: 'rgb(222, 255, 222)', zIndex: "100000", marginTop: '20px', height: "40px", opacity: "100%" }}>Moorestown Field Club Restaurant Reservation</p>
      <div id="sub_main">
        <p style={{width: '360px', paddingLeft: '20px'}} id="welcome">Welcome to Moorestown Field Club Restaurant Table Reservation. Please enter your member number and other preferences to reserve your table. You can also choose to order takeout below.</p>
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
        <div style={{display: 'flex', marginLeft: "-14px", justifyContent: "center", width: "100%"}}>
        <DateDrop setDateString={setDate}/>
        </div>
        <button onClick={booko} style={{height: '40px', cursor: 'pointer', alignSelf: 'center', marginLeft: '-35px', fontSize: "22px", width: "200px", border: '2px solid black'}}>Book Reservation</button>
        <p style={{color: "white", fontSize: "20px", textAlign: "center", marginLeft: "-45px"}}>Or</p>
        <button onClick={goToTakeout} style={{height: '40px', cursor: 'pointer', alignSelf: 'center', marginLeft: '-35px', fontSize: "22px", width: "200px", border: '2px solid black'}}>Order Takeout</button>
        </div>
      </div>
      <div className="cover">
     </div>
    </div>
  );
}

export default withRouter(User);

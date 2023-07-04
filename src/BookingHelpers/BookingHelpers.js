import React, {useState, useEffect} from "react";
import TimeList from './TimeList/TimeList';
import DateDrop from "./DateDrop/DateDrop";
// import ColorButton from '../../../Shared/ColorButton/ColorButton';
import SubmitButton from './SubmitButton/SubmitButton';
import {intToStringTime, createMaplist, getTimeRightAway, stringToIntTime} from '../utils';
// import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import SelectOneList from "./SelectOneList/SelectOneList";
// import BCAList from "../../../Shared/BCAList/BCAList";
// import x from './x.png'
import {withRouter} from 'react-router-dom';
import styles from './BookingHelper.module.css';
import {getFirestore, doc, setDoc, where, Firestore, collection} from 'firebase/firestore';
import { getDoc, query } from "firebase/firestore";
import {firebaseConfig} from '../utils';
import { initializeApp } from 'firebase/app';


  function BookingHelpers(props) {
    const [time, setTime] = useState(getTimeRightAway);
    const [times, setTimes] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [customerFound, setCustomerFound] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registeringNewGuest, setRegisteringNewGuest] = useState(false);
    const [newGuestName, setNewGuestName] = useState("");
    const [numAtTable, setNumAtTable] = useState("");
    const [memberNumber, setMemberNumber] = useState("");
    const [date, setDate] = useState(new Date().toDateString())
    const [tableNum, setTableNum] = useState('');
    const [employees, setEmployees] = useState(['scott', 'robert', 'sarah', 'jill'])
    const schedule = [{open: "12:00 PM", close: "7:00 PM"},
        {open: "", close: ""},
        {open: "11:00 AM", close: "6:00 PM"},
        {open: "11:00 AM", close: "9:00 PM"},
        {open: "11:00 AM", close: "9:00 PM"},
        {open: "11:00 AM", close: "9:00 PM"},
        {open: "11:00 AM", close: "6:00 PM"},
    ];



    function findGuest() {
        // use member number instead
    }

    // function toSetBcn(bcn) {
    //   return function() {
    //     setSelectedBcn(bcn);
    //   }
    // }

    function removeFound() {
      setCustomerFound();
    }


    function toSetTime(time) {
        setTime(time);
    }


    function selectEmployee(id) {
        setSelectedEmployee(id)
    }

    function unSelectEmployee() {
      setSelectedEmployee();
    }

    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

    useEffect(function() {
        let dater = new Date();
            if (date !== "") {
                dater = new Date(date);
            }
            const weekDayNum = dater.getDay();
            const newTimes = [];
            let i = stringToIntTime[schedule[weekDayNum].open];
            
            let timeRightAway = "";
            while (i <= stringToIntTime[schedule[weekDayNum].close]) {
                console.log(i);
                if (intToStringTime[i] === getTimeRightAway()) {
                    timeRightAway = intToStringTime[i];
                }
                newTimes.push(i);
                i++;
            }
            timeRightAway === "" ? setTime(stringToIntTime[schedule[weekDayNum].open]) : setTime(timeRightAway); 
            setTimes(newTimes);
     }, [date])

    //appear={employeesBack.length > 0 && (bcnArray === undefined || (bcnArray && bcnArray.length > 0))}

    async function booko() {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
    
        const newCityRef = doc(collection(db, "res"));

        await setDoc(newCityRef, {
          table_num: tableNum,
          time,
          date: date,
          mem_num: memberNumber
        });
    
      }


    return (
      <div id={styles.bookingHolder} style={{position: 'absolute', border: '2px solid black', left: window.innerWidth / 3, top: 50, zIndex: 900900000900000}}>
        <p style={{position: 'absolute', top: '0px',  right: '20px', fontSize: "36px"}}>x</p>
          <div id={styles.newContainer}>
              <div className={styles.holder}>
              <p onClick={props.hideMe} style={{fontSize: "18px", cursor: 'pointer', fontWeight: 'bold', marginTop: "20px", textAlign: "center", position: 'relative', right: "20px"}}>Create Table:</p>
              <div style={{marginTop: "32px"}}>
                <p className={styles.ptags}>Select Date:</p>
                <DateDrop small={true} setDateString={setDate}/>
              </div>
              <div style={{marginTop: "26px"}}>
                   <p className={styles.ptags}>Select Time:</p>
                  <TimeList time={time} times={times} setTime={(time) => toSetTime(time)}/>
              </div>
              </div>
              <div style={{display: "flex", flexDirection: 'column', alignItems: "center"}}>
              <div style={{paddingBottom: '40px'}}>
                <p style={{fontWeight: "bold", fontSize: "18px", marginBottom: "10px", marginTop: "26px"}}>Server:</p>
                <SelectOneList unSelectOne={unSelectEmployee} array={employees} selected={selectedEmployee} selectOne={(id) => selectEmployee(id)}/>
              </div>
              <div style={{display: 'flex'}}>
            <p style={{fontWeight: "bold", fontSize: "18px", paddingRight: "10px", paddingTop: "3px"}}>Member Number:</p>
            <input onChange={(e) => setMemberNumber(e.target.value)} value={memberNumber} placeholder="#" style={{width: '100px', paddingLeft: "6px"}}/>
            </div>
            <div style={{display: 'flex', height: "60px", paddingTop: "50px"}}>
            <p style={{fontWeight: "bold", fontSize: "18px", paddingRight: "10px", paddingTop: "3px"}}>Table Number:</p>
            <select value={tableNum} onChange={(e) => setTableNum(e.target.value)} style={{height: "30px", border: "1px solid black", paddingLeft: "5px", width: "80px"}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
            </select>
            </div>
            <button onClick={booko} style={{height: '40px', width: "150px", marginBottom: "20px", marginTop: "30px"}}>Create Table</button>
              </div>
        </div>
        {/* <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/> */}
        {/* <OtherAlert showAlert={error !== ""} alertMessage={error} alertType={"notgood"}/> */}
      </div>
    );
  }






export default BookingHelpers;

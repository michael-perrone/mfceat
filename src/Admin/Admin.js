import React, { useEffect, useState } from 'react';
import { stringToIntTime, intToStringTime } from '../utils';
import { withRouter } from "react-router-dom";
import BookingHelpers from '../BookingHelpers/BookingHelpers';
import DateDrop from '../BookingHelpers/DateDrop/DateDrop';
import './Admin.css';
import {getDocs, getFirestore, where, collection} from 'firebase/firestore';
import { doc, getDoc, query } from "firebase/firestore";
import {firebaseConfig} from '../utils';
import { initializeApp } from 'firebase/app';






function Admin(props) {
    const [tables, setNumOfTables] = useState(13);
    const [open, setOpen] = useState('11:00 AM');
    const [close, setClose] = useState('8:00 PM');
    const [times, setTimes] = useState([]);
    const [createHit, setCreateHit] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [date, setDate] = useState('');

    React.useEffect(function() {
        const timesrep = [...times];
        for (let i = stringToIntTime[open]; i <= stringToIntTime[close]; i++) {
            if (i % 3 === 0) {
                timesrep.push(intToStringTime[i]);
            }
        }
        setTimes(timesrep);
    }, [])

    React.useEffect(function() {
        setReservations([]);
        const reservationsCopy = [];
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const q = query(collection(db, 'res'), where('date', '==', date ));
        getDocs(q).then(response => {
            response.forEach(el => {
                reservationsCopy.push(el.data());
            })
            const newArr = [];
            for (let i = 0; i < tables; i++) {
                console.log("HELLO");
                newArr.push([]);
            }  
            for (let t = 0; t < reservationsCopy.length; t++) {
                newArr[reservationsCopy[t].table_num - 1].push(reservationsCopy[t]);
            }
            setReservations(newArr);
        })
        
    }, [date])

    function goToSettings() {
        props.history.push('/admin/settings')
    }

    function toSetCreateHit() {
        setCreateHit(oldvalue => {
            return !oldvalue;
        })
    }
    
    return (
        <div id='bigDog'>
          {createHit && <div style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', opacity: '80%', backgroundColor: 'black', zIndex: 803940249030}}></div>}
            {createHit && <BookingHelpers hideMe={toSetCreateHit}/>}
            <div id={'switch'} style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                <p style={{fontSize: "30px", marginTop: "20px"}}>MFC Restaurant Schedule</p>
                <div style={{marginTop: '20px'}}><DateDrop setDateString={setDate}/></div>
                <div id={'smallDiv'} style={{display: 'flex', justifyContent: 'space-around'}}>
                    <button onClick={toSetCreateHit} style={{ height: '30px', width: '120px', border: "1px solid black", cursor: 'pointer', marginTop: "20px"}}>Create New Table</button>
                    <button onClick={goToSettings} style={{ height: '30px', width: '80px', border: "1px solid black", cursor: 'pointer', marginTop: "20px"}}>Settings</button>
                </div>
            </div>
           <div style={{display: 'flex'}}>
            <div style={{width: '80px', marginTop: "62px", height: `${times.length * 59}px`}}>
                {times.map(e => {
                    return <p style={{width:"80px", paddingLeft: "10px", height: `${61}px`}}>{e}</p>
                })}
            </div>
            <div style={{display: 'flex', padding: "20px", marginTop: "20px", marginTop: '50px'}}>
                {reservations.map((e,i) => {
                    return <div style={{padding: "20px", position: 'relative', width: '65px', paddingTop: "0px", height: `${times.length * 59}px`, borderLeft: i ===  0 ? '1.4px solid black' : '0.8px solid black', borderRight: i === tables.length - 1 ? '1.4px solid black' : '0.8px solid black'}}>
                        <p style={{position: 'absolute', top: '-35px'}}>Table {i + 1}</p>
                        {e.map(element => {
                            return <div style={{position: "absolute", cursor: 'pointer', borderTop: "2px solid black", borderBottom: "2px solid black", display: "flex", justifyContent: "center", backgroundColor: "lightgreen", width: "105px", right: "0px", height: '242px', top: (stringToIntTime[element.time] - stringToIntTime[open]) * 20.4}}>{element.time}</div>
                        })}   
                    </div>
                })}
            </div>
            </div>
        </div>
    )
}

export default withRouter(Admin);
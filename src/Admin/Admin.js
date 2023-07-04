import React, { useEffect, useState } from 'react';
import { stringToIntTime, intToStringTime, getTime } from '../utils';
import { withRouter } from "react-router-dom";
import BookingHelpers from '../BookingHelpers/BookingHelpers';
import DateDrop from '../BookingHelpers/DateDrop/DateDrop';
import './Admin.css';
import {getDocs, getFirestore, where, collection} from 'firebase/firestore';
import { doc, getDoc, query } from "firebase/firestore";
import {firebaseConfig} from '../utils';
import { initializeApp } from 'firebase/app';
import TableModel from '../TableModel/TableModel';
import InHouseOrder from './AdminOrders/InHouseOrder/InHouseOrder';

function Admin(props) {
    const [tables, setNumOfTables] = useState(13);
    const [open, setOpen] = useState('11:00 AM');
    const [close, setClose] = useState('8:00 PM');
    const [times, setTimes] = useState([]);
    const [createHit, setCreateHit] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [date, setDate] = useState('');
    const [selectedTable, setSelectedTable] = useState("");
    const [hovering, setHovering] = useState('');
    const [addingOrder, setAddingOrder] = useState(false)
    const [selectedTableNum, setSelectedTableNum] = useState();
    const [currentTime, setCurrentTime] = useState('');
    const [selectedRes, setSelectedRes] = useState('');
    const [existingOrder, setExistingOrder] = useState('');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [notToday, setNotToday] = useState(true);


    useEffect(function() {
        const timeObj = getTime(`${new Date().getHours()}: ${new Date().getMinutes()}`);
        console.log(timeObj)
        setCurrentTime(`${timeObj.hour}:${timeObj.minute} ${timeObj.ap}`);
    }, [])



    function getColor(startTime, order) {
        if (new Date().toDateString() !== date) {
            return `rgb(0,200,0,.40)`
        }
        console.log("hello?")
        let color = "";
        if (stringToIntTime[startTime] < stringToIntTime[currentTime]) {
            if (!order) {
                console.log("me?")
                return`rgb(255,0,0,${(stringToIntTime[currentTime] - stringToIntTime[startTime]) / 24})`
            }
            else {
                console.log("hi")
                // go based off order time
               const ref = doc(db, 'orders', order);
               console.log(ref)
               getDoc(ref).then(doc => {
                const response = doc.data();
                console.log(response)
                if (!response.complete) {
                    console.log("not us?")
                    const time = getTime(response.time);
                    const timeStr = `${time.hour}:${time.minute} ${time.ap}`;
                console.log("hi!")
                 color = `rgb(255,0,0,${(stringToIntTime[currentTime] - stringToIntTime[timeStr]) / 24})`
                }
               })
               if (color === "") {
                color = `rgb(0,230,0, 0.5)`;
               }
               return color;
            }
        }
        else {
            return `lightgreen`
        }
    }

    function tableHit(table) {
        return function() {
            setSelectedTable(table)
        }
    }

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
      
        const q = query(collection(db, 'res'), where('date', '==', date ));
        getDocs(q).then(response => {
            response.forEach(el => {
                reservationsCopy.push(el.data());
            })
            const newArr = [];
            for (let i = 0; i < tables; i++) {
                newArr.push([]);
            }  
            for (let t = 0; t < reservationsCopy.length; t++) {
                newArr[reservationsCopy[t].table_num - 1].push(reservationsCopy[t]);
            }
            setReservations(newArr);
        })
        
    }, [date])

    function goToOrders() {
        props.history.push('/admin/orders')
    }

    function toSetCreateHit() {
        setCreateHit(oldvalue => {
            return !oldvalue;
        })
    }

    function hi() {
        console.log('hello');
    }

    function hello(num, resId, order) {
        setAddingOrder(true);
        setSelectedTableNum(num);
        setSelectedRes(resId)
        setExistingOrder(order);
    }

    function addOrder() {

    }


    React.useEffect(function() {
        if (new Date().toDateString() !== date) {
            setNotToday(true);
        }
        else {
            setNotToday(false);
        }
    }, [date])

    
   
    
    return (
        <div id='bigDog'>
          {(createHit || selectedTable !== "" || addingOrder) && <div style={{position: 'absolute', top: 0, left: 0, height: `${(stringToIntTime[close] - stringToIntTime[open]) * 20.5 + 150}px`, width: `${(tables + 1) * 107}px`, opacity: '80%', backgroundColor: 'black', zIndex: 803940249030}}></div>}
            {createHit && <BookingHelpers hideMe={toSetCreateHit}/>}
            {addingOrder && <InHouseOrder existingOrder={existingOrder} hideMe={() => setAddingOrder(false)} res={selectedRes} tableNum={selectedTableNum}/>}
            {selectedTable !== "" && <TableModel hideMe={() => setSelectedTable("")}  table={selectedTable}/>}
            <div id={'switch'} style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                <p style={{fontSize: "30px", marginTop: "20px"}}>MFC Restaurant Schedule</p>
                <div style={{marginTop: '20px'}}><DateDrop setDateString={setDate}/></div>
                <div id={'smallDiv'} style={{display: 'flex', justifyContent: 'space-around'}}>
                    <button onClick={toSetCreateHit} style={{ height: '30px', width: '120px', border: "1px solid black", cursor: 'pointer', marginTop: "20px"}}>Create New Table</button>
                    <button onClick={goToOrders} style={{ height: '30px', width: '80px', border: "1px solid black", cursor: 'pointer', marginTop: "20px"}}>Orders</button>
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
                            return <div onClick={!hovering ? tableHit(element) : () => hello(i + 1, element.id, element.order)} className='table' style={{position: "absolute", backgroundColor: getColor(element.time, element.order), cursor: 'pointer', borderTop: "2px solid black", borderBottom: "2px solid black", display: "flex", flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', width: "105px", right: "0px", height: '242px', top: (stringToIntTime[element.time] - stringToIntTime[open]) * 20.4}}><p>{element.time}</p>{!element.order && <button onClick={hovering ? addOrder : hi} onMouseLeave={() => setHovering(false)} onMouseOut={() => setHovering(false)} onMouseOver={() => setHovering(true)} onMouseEnter={() => setHovering(true)} style={{zIndex: 99999, height: '40px', width: '100px', position: 'relative', bottom: '2px', border: 'none', boxShadow: "0px 0px 4px black"}}>Enter Order</button>}
                            {element.order && !notToday && <button onClick={hovering ? addOrder : hi} onMouseLeave={() => setHovering(false)} onMouseOut={() => setHovering(false)} onMouseOver={() => setHovering(true)} onMouseEnter={() => setHovering(true)} style={{zIndex: 99999, height: '40px', width: '100px', position: 'relative', bottom: '2px', border: 'none', backgroundColor: hovering ? 'rgb(230,230,230)' :'lightyellow', boxShadow: "0px 0px 4px black"}}>Edit Order</button>}</div>
                        })}   
                    </div>
                })}
            </div>
            </div>
        </div>
    )
}

export default withRouter(Admin);
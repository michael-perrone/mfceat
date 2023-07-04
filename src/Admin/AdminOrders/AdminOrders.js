import React, { useState } from 'react';
import styles from './AdminOrders.module.css';
import {getDocs, getFirestore, where, collection} from 'firebase/firestore';
import { doc, getDoc, query } from "firebase/firestore";
import {firebaseConfig, menu, getTime, stringToIntTime} from '../../utils';
import { initializeApp } from 'firebase/app';
import { updateDoc } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const washingtonRef = doc(db, "cities", "DC");

// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });

function AdminOrders() {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [currentTime, setCurrentTime] = useState('');

    React.useEffect(function() {
        const res = getTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
        const currento = res.hour + ":" + res.minute + " " + res.ap;
        setCurrentTime(currento);
    }, [])

   async function completeOrder(index, id) {
        const oldCompleted = [...completedOrders];
        oldCompleted.push(currentOrders[index]);
        setCompletedOrders(oldCompleted);
        const oldCurrent = [...currentOrders].filter((e,i) => i !== index);
        setCurrentOrders(oldCurrent);
        const completeRef = doc(db, "orders", id);
        await updateDoc(completeRef, {
            complete: true
        })
    }


    React.useEffect(function() {
        const ordersCopy = [];
       
        const q = query(collection(db, 'orders'), where('date', '==', new Date().toDateString()));
        getDocs(q).then(response => {
            response.forEach(el => {
                console.log(el.data())
                ordersCopy.push(el.data());
            })
            const currentCopy = [...currentOrders];
            const completedCopy = [...completedOrders];
            for (let i = 0; i < ordersCopy.length; i++) {
                if (ordersCopy[i].complete) {
                    completedCopy.push(ordersCopy[i]);
                }
                else {
                    currentCopy.push(ordersCopy[i]);
                }
            }
            setCompletedOrders(completedCopy);
            setCurrentOrders(currentCopy);
        })
    }, [])




    return (
        <div>
            <p style={{textAlign: "center", fontSize: "32px", fontWeight: 'bold'}}>Orders</p>
            <div id={styles.main}>
                <div>
                    <p style={{fontSize: "24px", fontWeight: "bold", textAlign: "center", paddingBottom: "20px"}}>Current Orders</p>
                    <div>
                        {currentOrders.map((order,i) => {
                            const time = getTime(order.time);
                            const orderTime = `${time.hour}:${time.minute} ${time.ap}`;
                            return <div style={{paddingBottom: "50px", display: 'flex', flexDirection: 'column'}}>
                             <div style={{boxShadow: '0px 0px 4px black', paddingLeft: "5px", paddingRight: "5px", backgroundColor: `rgb(255,0,0,${(stringToIntTime[currentTime] - stringToIntTime[orderTime]) / 24})`, position: 'relative', display: 'flex', justifyContent: "space-between", borderBottom: "1px solid black", height: `${order.order.length === 1 ? 80 : order.order.length * 40}px`, width: "380px"}}>
                                <div style={{display: 'flex', justifyContent: "space-around", flexDirection: 'column'}}>
                                {order.order.map(item  => {
                                    return <p style={{paddingTop: "6px"}}>{menu[item].itemName}</p>
                                })}
                                </div>
                                <p style={{ position: 'absolute', top: '0px', right: '3px', cursor: 'pointer'}}>{orderTime}</p>
                                <p style={{ position: 'absolute', bottom: '2px', right: '3px', cursor: 'pointer'}}>{order.tableNum ? `Table #  ${order.tableNum}`: `Takeout: ${order.member}` }</p>
                            </div>
                            <button style={{height: "30px", border: "none", padding: '6px', boxShadow: "0px 0px 4px black", cursor: 'pointer', fontWeight: 'bold'}} onClick={() => completeOrder(i, order.id)}>Mark Order Complete</button>
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    <p style={{fontSize: "24px", fontWeight: "bold", paddingBottom: "20px", textAlign: "center"}}>Completed Orders</p>
                    <div>
                    {completedOrders.map((order,i) => {
                            const time = getTime(order.time);
                            const orderTime = `${time.hour}:${time.minute} ${time.ap}`;
                            return <div style={{boxShadow: "0px 0px 4px black", marginTop: "15px", paddingLeft: "5px", backgroundColor: `lightgreen`, position: 'relative', display: 'flex', justifyContent: "space-between", borderBottom: "1px solid black", height: `${order.order.length * 40}px`, width: "380px"}}>
                                <div style={{display: 'flex', justifyContent: "space-around", flexDirection: 'column'}}>
                                {order.order.map(item  => {
                                    return <p style={{paddingTop: "6px"}}>{menu[item].itemName}</p>
                                })}
                                </div>
                                <p style={{ position: 'absolute', top: '0px', right: '1px', cursor: 'pointer'}}>{orderTime}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders;
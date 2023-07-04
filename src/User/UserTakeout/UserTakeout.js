import React, { useState } from 'react';
import styles from './UserTakeout.module.css';
import {menu} from '../../utils';
import {firebaseConfig} from '../../utils';
import {getFirestore, doc, setDoc, Firestore, collection} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

function UserTakeout(props) {
    const [order, setOrder] = useState([]);
    const [orderBrief, setOrderBrief] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [lgap, setlgap] = useState();
    const [itemCounter, setItemCounter] = useState(1);
    const [member, setMember] = useState('');
    const [success, setSuccess] = useState(false);

    function clicker(index) {
        if (index !== lgap) {
            setlgap(index);
            setItemCounter(1);
        }
    }

    function addItem(item, index) {
        const orderCopy = [...order];
        for (let i = 0; i < itemCounter; i++) {
            orderCopy.push(item);
            setOrderTotal(oldTotal => oldTotal + item.itemPrice)
        }
        setOrder(orderCopy);
        const orderBriefCopy = [...orderBrief];
        for (let i = 0; i < itemCounter; i++) {
            orderBriefCopy.push(index);
        }
        setOrderBrief(orderBriefCopy);
        setItemCounter(1);
    }

    function editOrder(index, price) {
        const orderRep = [...order].filter((e, i) => {
            return index !== i;
        })
        setOrderTotal(oldTotal => oldTotal - price);
        const brief = [...orderBrief];

        setOrder(orderRep);
    }

    function addAdditional() {
        setItemCounter(oldCounter => oldCounter + 1);
        setSuccess(false);
    }

    function removeAdditional() {
        setItemCounter(oldCounter => oldCounter - 1);
    }

    async function createOrder() {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
    
        const newOrderRef = doc(collection(db, "orders"));
        await setDoc(newOrderRef, {
            order: orderBrief,
            member,
            date: new Date().toDateString(),
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
            complete: false,
            id: newOrderRef.id
          });
          setOrderBrief([]);
          setOrder([]);
          setOrderTotal(0);
          setMember('');
          setSuccess(true);
    }

    return (
        <div id={styles.main}>
            <div id={styles.heighto} style={{position: "absolute", background: "black", opacity: "70%", width: "100%"}}></div>
            <p id={styles.header} style={{color: 'rgb(222, 255, 222)', zIndex: 200, width: "400px"}}>The Moorestown Field Club Mark Rekant Takeout Center</p>
            <div id={styles.body}>
                <div style={{zIndex: 2000}} id={styles.left}>
                    <p style={{fontWeight: "bold", textAlign: "center", paddingBottom: "12px", color: 'rgb(222, 255, 222)'}}>Restaurant Menu:</p>
                    <div style={{width: "380px", borderRadius: "14px", height: "600px", overflow: "auto", backgroundColor: "#e5f7fd", boxShadow: "0px 0px 4px black"}}>
                        <div>
                            <p style={{textAlign: "center", paddingTop: "4px", fontSize: "28px"}}>Appetizers</p>
                                {menu.map((e, i) => {
                                    return i < 7 ? 
                                     <div onClick={() => clicker(i)} id={styles.bigGuy} style={{paddingTop: "30px", paddingBottom: "30px", backgroundColor: lgap === i ? "lightgreen" : ""}}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: "18px"}}>  <p style={{paddingLeft: "20px", fontWeight: "bold"}}>{e.itemName}</p> <p style={{paddingRight: "20px"}}>${e.itemPrice}</p> </div>
                                        <p style={{fontSize: "15px", paddingTop: "7px", paddingLeft: "20px", width: "250px"}}>{e.des}</p>
                                        {i === lgap && <div style={{display: "flex", paddingTop: "20px", justifyContent: "center"}}><button style={{height: "20px", width: "20px", borderRadius: "50%", boxShadow: "0px 0px 3px black", border: "none", cursor: "pointer"}} onClick={removeAdditional}>-</button><p style={{paddingLeft: "10px", paddingRight: "10px"}}>Item Count: {itemCounter}</p><button style={{height: "20px", width: "20px", borderRadius: "50%", boxShadow: "0px 0px 3px black", border: "none", cursor: "pointer"}} onClick={addAdditional}>+</button><button style={{marginLeft: "40px", border: "none", boxShadow: "0px 0px 4px black", height: "25px", width: "75px", cursor: "pointer"}} onClick={() => addItem(e,i)}>Add Item</button></div>}
                                    </div>
                                     : ""
                                })}
                        </div>
                        <div style={{paddingTop: "16px"}}>
                            <p style={{textAlign: "center", paddingTop: "4px", fontSize: "28px"}}>Salads</p>
                                {menu.map((e, i) => {
                                    return i >= 7 && i < 13 ? 
                                     <div onClick={() => clicker(i)} id={styles.bigGuy} style={{paddingTop: "30px",  backgroundColor: lgap === i ? "lightgreen" : "", paddingBottom: "30px"}}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: "18px"}}>  <p style={{paddingLeft: "20px",fontWeight: "bold"}}>{e.itemName}</p> <p style={{paddingRight: "20px"}}>${e.itemPrice}</p> </div>
                                        <p style={{fontSize: "15px", paddingTop: "7px", paddingLeft: "20px", width: "250px"}}>{e.des}</p>
                                        {i === lgap && <div style={{display: "flex", paddingTop: "20px", justifyContent: "center"}}><button style={{height: "20px", width: "20px", borderRadius: "50%", boxShadow: "0px 0px 3px black", border: "none", cursor: "pointer"}} onClick={removeAdditional}>-</button><p style={{paddingLeft: "10px", paddingRight: "10px"}}>Item Count: {itemCounter}</p><button style={{height: "20px", width: "20px", borderRadius: "50%", boxShadow: "0px 0px 3px black", border: "none", cursor: "pointer"}} onClick={addAdditional}>+</button><button style={{marginLeft: "40px", border: "none", boxShadow: "0px 0px 4px black", height: "25px", width: "75px", cursor: "pointer"}} onClick={() => addItem(e,i)}>Add Item</button></div>}
                                    </div>
                                     : ""
                                })}
                        </div>
                        <div style={{paddingTop: "16px"}}>
                             <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-around"}}><p style={{textAlign: "center", paddingTop: "4px", fontSize: "28px"}}>Entrees</p><p style={{fontSize: "14px", marginTop: "8px"}}>Served with fries or side salad</p></div>
                                {menu.map((e, i) => {
                                    return i >= 13 && i < 28 ? 
                                     <div onClick={() => clicker(i)} id={styles.bigGuy} style={{paddingTop: "30px", backgroundColor: lgap === i ? "lightgreen" : "", paddingBottom: "30px"}}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: "18px"}}>  <p style={{paddingLeft: "20px",fontWeight: "bold"}}>{e.itemName}</p> <p style={{paddingRight: "20px"}}>${e.itemPrice}</p> </div>
                                        <p style={{fontSize: "15px", paddingTop: "7px", paddingLeft: "20px", width: "250px"}}>{e.des}</p>
                                        {i === lgap && <div style={{display: "flex", paddingTop: "20px", justifyContent: "center"}}><button style={{height: "20px", width: "20px", borderRadius: "50%", boxShadow: "0px 0px 3px black", border: "none", cursor: "pointer"}} onClick={removeAdditional}>-</button><p style={{paddingLeft: "10px", paddingRight: "10px"}}>Item Count: {itemCounter}</p><button style={{height: "20px", width: "20px", borderRadius: "50%", boxShadow: "0px 0px 3px black", border: "none", cursor: "pointer"}} onClick={addAdditional}>+</button><button style={{marginLeft: "40px", border: "none", boxShadow: "0px 0px 4px black", height: "25px", width: "75px", cursor: "pointer"}} onClick={() => addItem(e,i)}>Add Item</button></div>}
                                    </div>
                                     : ""
                                })}
                        </div>
                    </div>
                </div>
                <div style={{zIndex: 2000}} id={styles.right}>
                    <p style={{fontWeight: "bold", textAlign: "center", paddingBottom: "12px", color: 'rgb(222, 255, 222)'}}>Your Order:</p>
                    <div style={{width: "380px", borderRadius: "14px", height: "600px", overflow: "auto", backgroundColor: "#e5f7fd", boxShadow: "0px 0px 4px black"}}>
                    {order.length === 0 && !success && <p style={{paddingTop: '10px', textAlign: 'center'}}>Theres nothing in your order cart right now.</p>}
                    {order.length === 0 && success && <p style={{paddingTop: '10px', textAlign: 'center'}}>Your order has been submitted. Your number order to check the status of your order is: </p>}
                        {order.map((e,i) => {
                            return  <div style={{ display: 'flex', borderBottom: "0.3px solid black", paddingTop: "15px", paddingBottom: "15px", justifyContent: 'space-between', fontSize: "18px"}}>  <p style={{paddingLeft: "20px",fontWeight: "bold"}}>{e.itemName}</p> <div style={{display: 'flex'}}><p style={{paddingRight: "10px", paddingTop: '3px'}}>${e.itemPrice}</p><button style={{fontWeight: 'bold', marginRight: "10px", fontSize: "16px", borderRadius: "50%", height: "30px", width: "30px", paddingBottom: "30px", backgroundColor: "rgb(240,0,0,.50)", boxShadow: "0px 0px 4px black", border: 'none', cursor: 'pointer'}} onClick={() => editOrder(i, e.itemPrice)}>_</button></div> </div>
                        })}
                        {orderTotal !== 0 && <div style={{ display: 'flex', paddingTop: "25px", paddingBottom: "25px", justifyContent: 'space-between', fontSize: "16px"}}>  <p style={{paddingLeft: "20px", fontWeight: 'bold'}}>Your Order Total:</p> <p style={{paddingRight: "20px", fontWeight: 'bold'}}>${orderTotal}</p> </div>}
                        {orderTotal !== 0 && <div style={{paddingTop: "100px", display: 'flex', justifyContent: 'space-around'}}><input value={member} onChange={(e) => setMember(e.target.value)} style={{height: "25px", paddingLeft: "4px"}} placeholder='Enter Member Number'/>
                            <button style={{border: "none", width: "100px", cursor: 'pointer', marginTop: "2px", height: "25px", backgroundColor: "white", boxShadow: "0px 0px 3px black"}} onClick={createOrder}>Confirm Order</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTakeout;
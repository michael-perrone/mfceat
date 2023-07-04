import React, { useEffect, useState } from 'react';
import styles from './InHouseOrder.module.css';
import {menu, firebaseConfig} from '../../../utils';
import {getFirestore, doc, setDoc, Firestore, collection, updateDoc, getDoc} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

function InHouseOrder(props) {
    const [order, setOrder] = useState([]);
    const [orderBrief, setOrderBrief] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [lgap, setlgap] = useState();
    const [itemCounter, setItemCounter] = useState(1);
    const [member, setMember] = useState('');
    const [success, setSuccess] = useState(false);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

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

    function addAdditional() {
        setItemCounter(oldCounter => oldCounter + 1);
        setSuccess(false);
    }

    function removeAdditional() {
        setItemCounter(oldCounter => oldCounter - 1);
    }

    useEffect(function() {
        console.log(props.existingOrder)
        if (props.existingOrder !== "") {
            const refo = doc(db, 'orders', props.existingOrder);
            getDoc(refo).then(response => {
                console.log("yo");
                const data = response.data();
                const forder = [...order];
                for (let i = 0; i < data.order.length; i++) {
                    console.log(menu[data.order[i]])
                    forder.push(menu[data.order[i]]);
                }
                setOrder(forder);
            })
        }
    }, [props.existingOrder])

    async function updateOrder() {
        const completeRef = doc(db, "orders", props.existingOrder);
        await updateDoc(completeRef, {
            complete: true
        })
    }

     function editOrder(index) {
        const orderRep = [...order].filter((e, i) => {
            return index !== i;
        })
        setOrder(orderRep);
    }

    async function createOrder() {
   
    
        const newOrderRef = doc(collection(db, "orders"));
        await setDoc(newOrderRef, {
            order: orderBrief,
            member,
            tableNum: props.tableNum,
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
          console.log("hi")
          console.log(props.res);
          
          const res = doc(db, "res", props.res);
          console.log('bye')
          console.log(res);
          await updateDoc(res, {
              order: newOrderRef.id
          })
    }

    async function update() {
        const orderRep = [...order];
        const briefo = [];
        for (let i = 0; i < orderRep.length; i++) {
            for (let t = 0; t < menu.length; t++) {
                if (menu[t].itemName === orderRep[i].itemName) {
                    briefo.push(t);
                }
            }
        }
        console.log(briefo)
        const res = doc(db, "orders", props.existingOrder);
        await updateDoc(res, {
            order: briefo
        })
      }
    
    

    return (
        <div style={{zIndex: 9999999999}} id={styles.body}>
        <div style={{zIndex: 2000}} id={styles.left}>
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
        <div style={{zIndex: 2000, position: 'relative'}} id={styles.right}>
            <div style={{width: "380px", borderRadius: "14px", height: "600px", overflow: "auto", backgroundColor: "#e5f7fd", boxShadow: "0px 0px 4px black"}}>
            <p style={{paddingTop: '10px', paddingBottom: "20px", textAlign: 'center', fontSize: "16px"}}>Order for Table Number: {props.tableNum}</p>
            <button onClick={props.hideMe} style={{position: 'absolute', top: "4px", right: "10px", fontSize: "26px", fontWeight: 'bold', borderRadius: "60%", width: "40px", border: 'none', height: '40px', boxShadow: '0px 0px 4px black'}}>X</button>
                {order.map((e,i) => {
                    return  <div style={{  display: 'flex', borderBottom: "0.3px solid black", paddingTop: i !== 0 ? "15px" : "50px", paddingBottom: "15px", justifyContent: 'space-between', fontSize: "18px"}}>  <p style={{paddingLeft: "20px",fontWeight: "bold"}}>{e.itemName}</p><button style={{fontWeight: 'bold', marginRight: "10px", fontSize: "16px", borderRadius: "50%", height: "30px", width: "30px", paddingBottom: "30px", backgroundColor: "rgb(240,0,0,.50)", boxShadow: "0px 0px 4px black", border: 'none', cursor: 'pointer'}} onClick={() => editOrder(i)}>_</button> </div>
                })}
                {orderTotal !== 0 && !props.existingOrder && <div style={{paddingTop: "100px", display: 'flex', justifyContent: 'space-around'}}>
                    <button style={{border: "none", width: "100px", cursor: 'pointer', marginTop: "2px", height: "25px", backgroundColor: "white", boxShadow: "0px 0px 3px black"}} onClick={createOrder}>Confirm Order</button>
                </div>}
                {props.existingOrder && <div style={{paddingTop: "100px", display: 'flex', justifyContent: 'space-around'}}>
                    <button style={{border: "none", width: "100px", cursor: 'pointer', marginTop: "2px", height: "25px", backgroundColor: "white", boxShadow: "0px 0px 3px black", width: "160px"}} onClick={update}>Confirm Order Change</button>
                </div>}
            </div>
        </div>
    </div>
    )
}

export default InHouseOrder;
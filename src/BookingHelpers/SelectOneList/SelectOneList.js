import React from 'react';
import styles from './SelectOneList.module.css';

function SelectOneList(props) {
    return (
        props.array ?
        <div style={{maxHeight: "270px", overflow: "auto", boxShadow: '0px 0px 3px #f9e9f9', width: "250px"}}>
        {props.array.map((element, index) => {
            console.log(element)
            return (
                    props.selected !== element ?
                    <div key={element["_id"]} onClick={() => props.selectOne(element)} id={styles.subContainer}>
                       <p style={{fontSize: "18px"}}>{element}</p>
                    </div>
                      :
                    <div style={{backgroundColor:"lightgray", color: "black", borderTop: "0.5px solid black", borderBottom: "0.5px solid black"}} key={element["_id"]} onClick={props.unSelectOne} id={styles.subContainer}>
                       <p style={{fontSize: "18px"}}>{element}</p>
                    </div> 
            )
        })}
        </div> : 
        <p style={{fontWeight: "bold", textAlign: "center"}}>{props.none}</p>
    )
}

export default SelectOneList;
import React, {useState, useEffect} from "react";
import TimeList from '../BookingHelpers/TimeList/TimeList';
import DateDrop from "../BookingHelpers/DateDrop/DateDrop";
// import ColorButton from '../../../Shared/ColorButton/ColorButton';
import {intToStringTime, createMaplist, getTimeRightAway, stringToIntTime} from '../utils';
// import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import SelectOneList from "../BookingHelpers/SelectOneList/SelectOneList";
import styles from './TableModel.module.css';


  function TableModel(props) {
    const [dateString, setDateString] = useState("");
    const [time, setTime] = useState(getTimeRightAway);
    const [times, setTimes] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [customerFound, setCustomerFound] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registeringNewGuest, setRegisteringNewGuest] = useState(false);
    const [newGuestName, setNewGuestName] = useState("");
    const [employees, setEmployees] = useState(['scott', 'robert', 'sarah', 'jill'])
    const schedule = [{open: "12:00 PM", close: "7:00 PM"},
        {open: "", close: ""},
        {open: "11:00 AM", close: "6:00 PM"},
        {open: "11:00 AM", close: "9:00 PM"},
        {open: "11:00 AM", close: "9:00 PM"},
        {open: "11:00 AM", close: "9:00 PM"},
        {open: "11:00 AM", close: "6:00 PM"},
    ];


    // function createBooking() {
    //  // data = ["phone": phone ,"timeStart": timeStart, "date": date, "serviceIds": serviceIdsArray,
    //   // "businessId": Utilities().decodeAdminToken()!["businessId"], "bcn": selectedBcn, "cost": costForTable]
    //   if (phoneNumber === "") {
    //     setError("");
    //     setTimeout(() => setError("Please fill in phone number"), 200);
    //   }
    //   if (!registeringNewGuest && !customerFound) {
    //     setError("");
    //     setTimeout(() => setError("Please fill in phone number"), 200);
    //   }
    //   if (registeringNewGuest && newGuestName === "") {
    //     setError("");
    //     setTimeout(() => setError("Please fill in new guest name"), 200);
    //   }

    // if (bookingType === "Regular") {
    //   Axios.post("api/iosBooking/admin", selectedBcn ? {phone: phoneNumber, timeStart: time, date: dateString, serviceIds: selectedServices,
    //     businessId: props.admin.admin.businessId, bcn: selectedBcn, employeeId: selectedEmployee } : {phone: phoneNumber, timeStart: time, date: dateString,
    //       serviceIds: selectedServices, businessId: props.admin.admin.businessId,  employeeId: selectedEmployee}).then(
    //    response => {
    //      if (response.status === 200) {
    //          setEmployeesBack([]);
    //          setSelectedEmployee();
    //          setPhoneNumber("");
    //          setNewGuestName("");
    //          setCustomerFound();
    //          setSelectedBcn("");
    //          setSuccessMessage("");
    //          setTimeout(() => setSuccessMessage("Booking successfully created"), 200);
    //          props.loadSchedule(); // check this
    //        }
    //      }
    //     ).catch(error => {
    //     console.log(error)
    //     })
    //   }
  //  }

  function deleteTable() {

  }


    function toSetDateString(dateString1) {
          setDateString(dateString1)
    }

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
            if (dateString !== "") {
                dater = new Date(dateString);
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
     }, [dateString])

    //appear={employeesBack.length > 0 && (bcnArray === undefined || (bcnArray && bcnArray.length > 0))}



    return (
      <div id={styles.bookingHolder} style={{position: 'absolute', border: '2px solid black', left: window.innerWidth / 3, top: 50, zIndex: 900900000900000}}>
        <p style={{position: 'absolute', top: '0px',  right: '20px', fontSize: "36px"}}>x</p>
          <div id={styles.newContainer}>
              <div className={styles.holder}>
              <p onClick={props.hideMe} style={{fontSize: "18px", cursor: 'pointer', fontWeight: 'bold', marginTop: "20px", textAlign: "center", position: 'relative', right: "20px"}}>Reservation Information</p>
              <div style={{marginTop: "32px", display: 'flex'}}>
                <p style={{marginTop: "-1.5px"}} className={styles.ptags}>Date:</p>
                <p>{props.table.date}</p>
              </div>
              <div style={{marginTop: "20px", display: 'flex'}}>
                <p style={{marginTop: "-1.5px"}} className={styles.ptags}>Number of Guests:</p>
                <p>{props.table.numAtTable}</p>
              </div>
              <div style={{display: 'flex', marginTop: "20px"}}>
               <p style={{marginTop: "-5px", fontSize: "18px", paddingRight: "10px", paddingTop: "3px"}}>Table Number:</p>
               <p>{props.table.table_num}</p>
            </div>
              <div style={{display: 'flex', marginTop: "20px"}}>
            <p style={{ fontSize: "18px", paddingRight: "10px", marginTop: "-2px"}}>Member Number:</p>
            <p>{props.table.mem_num}</p>
            </div>
              <div style={{marginTop: "20px", display: "flex"}}>
                   <p style={{marginTop: "-1.5px"}} className={styles.ptags}>Time:</p>
                    <p>{props.table.time}</p>
              </div>
              </div>
              <div style={{display: "flex", flexDirection: 'column', alignItems: "center"}}>
              {!props.table.server && <div style={{paddingBottom: '40px'}}>
                <p style={{fontWeight: "bold", fontSize: "18px", marginBottom: "10px", marginTop: "26px"}}>Server:</p>
                <SelectOneList unSelectOne={unSelectEmployee} array={employees} selected={selectedEmployee} selectOne={(id) => selectEmployee(id)}/>
              </div>}
            <button onClick={deleteTable} style={{height: '40px', cursor: "pointer", width: "150px", marginBottom: "20px", marginTop: "30px", backgroundColor: "rgb(255,0,0,0.5"}}>Delete Table</button>
           </div>
        </div>
        {/* <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/> */}
        {/* <OtherAlert showAlert={error !== ""} alertMessage={error} alertType={"notgood"}/> */}
      </div>
    );
  }






export default TableModel;

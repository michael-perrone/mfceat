import React from 'react';
import DateDrop from '../../BookingHelpers/DateDrop/DateDrop';
import TimeList from '../../BookingHelpers/TimeList/TimeList';
import {intToStringTime} from '../../utils';

function AdminSettings() {
    const [times, setTimes] = React.useState([]);

    React.useEffect(function() {
        console.log("HELLO")
        const fakeTimesArray = [];
        for (let i = 0; i < 288; i++) {
            console.log(i)
            fakeTimesArray.push(i);
        }
        setTimes(fakeTimesArray);
    }, []);

    return (
       <div>
         <div style={{width: '100%', fontSize: "22px", marginTop: "20px", display: 'flex', justifyContent: 'center', marginBottom: "20px"}}>
            <p>Admin Settings Page</p>  
         </div>
          <div style={{paddingTop: "20px", paddingLeft: '20px', marginTop: "40px", height: "130px", borderTop: "1px solid black", borderBottom: "1px solid black"}}>
            <div style={{display: 'flex'}}>
                <p style={{paddingTop: "8px", fontWeight: "bold", paddingRight: "20px"}}>Special Date Open-Close:</p>
                <DateDrop/>
                <div style={{display: 'flex', height: "40px", justifyContent: 'center', marginLeft: "40px"}}>
                    <div style={{paddingRight: "10px"}}>
                        <TimeList times={times}/>
                    </div>
                    <p style={{fontSize: "40px", marginTop: "-10px"}}> - </p>
                    <div style={{marginLeft: "8px"}}>
                        <TimeList times={times}/>
                    </div>
                </div>
           </div>
        <div style={{height: "110px", display: 'flex', justifyContent: 'space-around', paddingTop: '40px'}}>
           <button style={{height: '40px', width: "100px", cursor: 'pointer', fontSize: "20px"}}>Add Date</button>
           <div>
            <p>Added Dates:</p>
            <p>Added Dates Will Go Here</p>
           </div>
        </div> 
      </div>
      <div style={{paddingTop: "40px", display: 'flex', justifyContent: 'space-around', borderBottom: "1px solid black", paddingBottom: "40px"}}>
        <div>
            <div style={{display: 'flex'}}>
            <p style={{fontWeight: "bold", marginTop: '2px'}}>Add Member:</p>
            <input style={{height: '25px', paddingLeft: '6px', marginLeft: "20px"}} placeholder='Member Name'/>
            <input style={{height: '25px', paddingLeft: '6px', marginLeft: "20px"}} placeholder='Member Number'/>
            </div>

            <button style={{padding: "4px", marginRight: "-400px", height: '30px', cursor: 'pointer'}}>Add Member</button>
        </div>

        <div style={{paddingTop: "20px"}}>
          <p>Member List:</p>
          <p>Member List will go here</p>
        </div>
    </div>
    

      <div style={{paddingTop: "40px", display: 'flex', borderBottom: '1px solid black', paddingBottom: "30px", justifyContent: 'space-around'}}>
        <div>
            <div style={{display: 'flex'}}>
            <p style={{fontWeight: "bold", marginTop: '2px'}}>Add Employee:</p>
            <input style={{height: '25px', paddingLeft: '6px', marginLeft: "20px"}} placeholder='Employee Name'/>
            </div>

            <button style={{padding: "4px", marginRight: "-400px", height: '30px', cursor: 'pointer'}}>Add Employee</button>
        </div>
        <div style={{paddingTop: "20px"}}>
          <p>Employee List:</p>
          <p>Employee List will go here</p>
        </div>
      </div>
      <div style={{paddingTop: "40px", display: 'flex', justifyContent: 'space-around'}}>
        <div>
            <div style={{display: 'flex'}}>
            <p style={{fontWeight: "bold", marginTop: '2px'}}>Add Menu Item:</p>
            <input style={{height: '25px', paddingLeft: '6px', marginLeft: "20px"}} placeholder='Item Name'/>
            <input style={{height: '25px', paddingLeft: '6px', marginLeft: "20px"}} placeholder='Item Price'/>

            </div>
            <textarea style={{resize: "none", height: "100px", width: '400px', marginTop: "20px"}} placeholder='Item Description'/>
            <div style={{marginTop: "10px"}}>
            <input style={{height: '25px', paddingLeft: '6px', marginLeft: "20px"}} placeholder='Item Category'/>
            <button style={{padding: "4px", marginLeft: "10px", marginRight: "-400px", height: '30px', cursor: 'pointer'}}>Add Menu Item</button>
            </div>
            
        </div>
        <div style={{paddingTop: "20px"}}>
          <p>Menu Item List:</p>
          <p>Menu Item List will go here</p>
        </div>
      </div>
    </div>
    )
}

export default AdminSettings;
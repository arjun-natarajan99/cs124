import React from 'react';
import "./Warning.css"

function Warning(props){
    return (
        <div className="backdrop">
            <div id="warning">
                <p>Are you sure you want to delete all completed items? This action is irreversible.</p>
                <button id="cancel" onClick={props.onClose}>
                    Cancel
                </button>
                <button id="confirm" onClick={(e)=>
                {props.onItemsDeleted(props.data.filter((item) => item.checked).map((item) => item.id));
                    props.onClose();}
                    }>
                    Confirm
                </button>


            </div>
        </div>
    );
}
export default Warning;
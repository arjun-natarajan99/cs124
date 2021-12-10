import React from 'react';
import "./Warning.css"

function Warning(props){
    return (
        <div className="backdrop">
            <div className="warningPopup">
                <p>Are you sure you want to delete all completed items? This action is irreversible.</p>
                <button tabIndex={1} id="cancel" onClick={props.onClose}
                        aria-label={"Do not delete items."}
                >
                    Cancel
                </button>
                <button tabIndex={2}
                        id="confirm"
                        onClick={(e)=>
                        {props.onItemsDeleted(props.data.filter((item) => item.checked).map((item) => item.id));
                        props.onClose();}}
                        aria-label={"Delete all items. This action is irreversible."}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}
export default Warning;
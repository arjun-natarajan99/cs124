import React, {useState} from 'react';
import "./ShareScreen.css"

function ShareScreen(props){
    const [emails, setEmails] = useState([]);
    const [currentEmail, setCurrentEmail] = useState("");
    const [showShareWithSelfError, setShowShareWithSelfError] = useState(false);
    const [showShareWithValidError, setShowShareWithValidError] = useState(false);
    const [showShareWithDuplicateError, setShowShareWithDuplicateError] = useState(false);
    function checkValidInput(){
        if (currentEmail !== "" && currentEmail !== props.user.email
            && !(props.showShareScreenEmails.includes(currentEmail))
            && !(emails.includes(currentEmail))
            && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(currentEmail)) {
            setEmails([...emails, currentEmail]);
            setCurrentEmail("");
            setShowShareWithValidError(false);
            setShowShareWithSelfError(false);
            setShowShareWithDuplicateError(false);
        }
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(currentEmail)) {
            setShowShareWithValidError(true);
            setShowShareWithSelfError(false);
            setShowShareWithDuplicateError(false);
        }
        if (currentEmail === props.user.email){
            setShowShareWithSelfError(true);
            setShowShareWithValidError(false);
            setShowShareWithDuplicateError(false);
        }
        if (props.showShareScreenEmails.includes(currentEmail) || emails.includes(currentEmail)){
            setShowShareWithDuplicateError(true);
            setShowShareWithValidError(false);
            setShowShareWithSelfError(false);
        }

    }
    return (
        <div className="backdrop">
            <div className="sharePopup">
                <p id="description"> Who would you like to share this list with? Enter their emails below:</p>
                <button
                    id ="addUser"
                    className= {`button ${currentEmail ? "enabled" : "disabled"}`}
                    onClick={(e) => {
                        checkValidInput()
                    }}
                > +</button>
                <input type={'text'}
                       required
                       id="emailInput"
                       placeholder={'Enter email here...'}
                       onChange={(e) => setCurrentEmail(e.target.value)}
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               checkValidInput();
                           }
                       }}
                       value={currentEmail}
                />
                {showShareWithSelfError && <p className="shareWarning">You cannot share a list with yourself.</p> }
                {showShareWithDuplicateError &&
                    <p className="shareWarning" >This list is already shared with this user.</p>}
                {showShareWithValidError && <p className="shareWarning">You must enter a valid email.</p>}

                <p id="disclaimer"> Note that these users
                    will only be able to access a shared list once they have verified their account.</p>
                <div id="shareWith">
                    <h3 > Share With:</h3>
                    <ul className="emails">
                        {emails.map(a =>
                            <li className="email"
                                onClick={() => setEmails(emails.filter((e) => e !== a))}>
                                {a}
                            </li>)
                        }
                    </ul>
                </div>
                <div id="alreadyShared">
                    <h3> Already Shared With:</h3>
                    <ul className="emails">
                        {props.showShareScreenEmails.map(a =>
                            <li className="email"
                                onClick={() => props.onListUnshared(props.showShareScreenID, a, true)}>
                                {a}
                            </li>)
                        }
                    </ul>
                </div>
                {/*<ul>{props.showShareScreenEmails.map(a => <li*/}
                {/*    onClick={props.onListUnshared(props.showShareScreenID, a, true)}>{a}</li>)}</ul>*/}

                <div id ="buttons">
                    {emails.length !== 0 &&
                        <button
                            id="share"
                            onClick={() => {
                                props.onListShared(props.showShareScreenID, emails);
                                // setEmails([]);
                                props.setShowShareScreenID(null);

                            }}
                        >
                            Share
                        </button>
                    }
                    <button
                        id="cancelShare"
                        onClick ={() => props.setShowShareScreenID(null)}
                        aria-label={"Cancel sharing."}> Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default ShareScreen;
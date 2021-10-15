import React from 'react';
import ListItem from './ListItem.js';
import Warning from './Warning.js';
import {useState} from "react";
import './List.css';
import { CSSTransitionGroup } from 'react-transition-group'

function List(props) {
    const [hideCompletedItems, setHideCompletedItems] = useState(false);
    const [editable, setEditable] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [addable, setAddable] = useState(false);

    const listItems = props.data.map(a => <ListItem id={a.id}
                                                    item={a.item}
                                                    checked={a.checked}
                                                    editable={editable}
                                                    onItemChanged={props.onItemChanged}
                                                    key={a.id}
                                                    {...a}/>);
    const incompleteListItems = listItems.filter((item) => !item.props.checked);

    return (
        <div id="list">
            <h1>To-Do List</h1>

            <div id="inputBox_Button">
                <button id="addItem"
                        className={addable ? "enabled" : "disabled"}
                        onClick={(e)=> {
                            if(document.getElementById("inputText").value !== "") {
                            props.onItemAdded(document.getElementById("inputText").value);
                                document.getElementById("inputText").value = "";
                                setAddable(false);}}}>
                    +
                </button>
                <input id = "inputText" type={'text'} onChange={(e) => {
                    if (e.target.value !== "") {
                        setAddable(true);
                    }
                    else {
                        setAddable(false);
                    }
                }}/>
            </div>


            {listItems.length !== 0 && <div id ="editButton">
                <button onClick={() => setEditable(!editable)}> {editable ? "Save Changes" : "Edit Items"} </button>
            </div>}

            <div id="listItems" >
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnter={300}
                    transitionLeave={300}>
                {hideCompletedItems ? incompleteListItems :listItems}
                </CSSTransitionGroup>
            </div>


            {showWarning && <Warning data={props.data}
                                     onItemsDeleted={props.onItemsDeleted}
                                     onClose={() =>setShowWarning(false)}
            />}
            {(incompleteListItems.length !== listItems.length) &&

                <div className="completedButtons">

                    {!hideCompletedItems ?
                        <button id="hideCompleted" onClick={() => setHideCompletedItems(!hideCompletedItems)}>
                        Hide Completed Items
                        </button> :
                        <button id="showCompleted" onClick={() => setHideCompletedItems(!hideCompletedItems)}>
                        Show Completed Items
                        </button>
                    }
                    <button id="deleteCompleted"
                    onClick={() => setShowWarning(true)}>
                    Delete Completed Items
                    </button>
                </div>

            }

        </div>


    );

}
export default List;
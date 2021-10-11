import React from 'react';
import ListItem from './ListItem.js';
import {useState} from "react";
import './List.css';

function List(props) {
    const [hideCompletedItems, setHideCompletedItems] = useState(false);

    let listItems = props.data.map(a => <ListItem id={a.id} item={a.item} checked={a.checked} onToggleItemChecked={props.onToggleItemChecked} key={a.id} {...a}/>);

    return (
        <div id="list">
            <h1>To-Do List</h1>

            <div id="inputBox_Button">
                <button id="addItem"
                        onClick={(e)=> props.onItemAdded(document.getElementById("inputText").value)}>
                    +
                </button>
                <input id = "inputText" type={'text'}/>
            </div>

            {listItems.length !== 0 && <div id ="editButton">
                <button> Edit Items </button>
            </div>}

            <div id="listItems" >
                {hideCompletedItems ?
                   (listItems.filter((item) => !item.props.checked))
                    :(listItems)}

            </div>

            <div id="completedButtons">
                {!hideCompletedItems ? <button id="hideCompleted" onClick={() => setHideCompletedItems(!hideCompletedItems)}>
                    Hide Completed Items
                </button> :
                    <button id="showCompleted" onClick={() => setHideCompletedItems(!hideCompletedItems)}>
                        Show Completed Items
                    </button>
                }
                <button id="deleteCompleted"
                        onClick={(e)=> props.onItemsDeleted(props.data.filter((item) => item.checked).map((item) => item.id))}>
                Delete Completed Items
                </button>
            </div>

        </div>


    );

}
export default List;
import React from 'react';
import ListItem from './ListItem.js';

function List(props) {
    return (
        <div>
            <h1>To-Do List</h1>

            <div>
                <button id= "addItem" onClick={(e)=> props.onItemAdded(document.getElementById("inputText").value)}>+</button>
                <input id = "inputText" type={'text'}/>
            </div>

            {props.data.map(a => <ListItem id={a.id} item={a.item} checked={a.checked} key={a.id} {...a}/>)}

            <div id="completedButtons">
                <button id="deleteCompleted"
                        onClick={(e)=> props.onItemsDeleted(props.data.filter((item) => item.checked).map((item) => item.id))}>
                Delete Completed Items
                </button>
            </div>

        </div>


    );

}
export default List;
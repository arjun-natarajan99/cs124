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
    const [newItemText, setNewItemText] = useState("");
    const [newItemPriority, setNewItemPriority] = useState({key: 0, value: "--"});

    let listItems = props.data.map(a => <ListItem id={a.id}
                                                    item={a.item}
                                                    checked={a.checked}
                                                    editable={editable}
                                                    onItemChanged={props.onItemChanged}
                                                    key={a.id}
                                                    created={a.created}
                                                    priority={a.priority}
                                                    onItemsDeleted={props.onItemsDeleted}
                                                    {...a}/>);
    const incompleteListItems = listItems.filter((item) => !item.props.checked);
    const sortLabels = {
        created: {name: "Creation Date", desc: "New → Old", asc: "Old → New"},
        item: {name: "Name", desc: "Z → A", asc: "A → Z"},
        priority: {name: "Priority", desc: "High → Low", asc: "Low → High"},
    };
    let dropDownOptions = [];
    for(let field in sortLabels){
        if (field !== "order") {
            for (let direction of ["desc", "asc"]) {
                if (props.sortField !== field || props.sortDirection !== direction) {
                    dropDownOptions.push(
                        <option value={`${field} ${direction}`}>Sort
                            by {sortLabels[field].name}: {sortLabels[field][direction]}</option>);
                }
            }
        }
    }
    return (
        <div id="list">
            <h1>To-Do List</h1>

            {listItems.length !== 0 &&
            <div id="sort">
                <select id="priorityDropDown"
                        onChange={(e) => props.onSortItems(e.target.value)}
                        disabled={editable}>
                    <option value="">Sort by {sortLabels[props.sortField].name}: {sortLabels[props.sortField][props.sortDirection]}</option>
                    {dropDownOptions}
                </select>
            </div>
            }

            <div id="inputBox_Button">
                <button id="addItem"
                        className={newItemText ? "enabled" : "disabled"}
                        onClick={(e)=> {
                            if (newItemText !== "") {
                                props.onItemAdded(newItemText, newItemPriority);
                                setNewItemText("");
                            }
                        }}>
                    +
                </button>
                <input id = "inputText"
                       type={'text'}
                       placeholder={"Enter text here..."}
                       onChange={(e) => setNewItemText(e.target.value)}
                       value={newItemText}
                       disabled={editable}/>
                <select id="selectPriority"
                        onChange={(e) => setNewItemPriority(JSON.parse(e.target.value))}
                        disabled={editable}
                        >
                    <option value='{"key": "0", "value": "--"}'>--Set Priority--</option>
                    <option value='{"key": "c", "value": "High"}'>High</option>
                    <option value='{"key": "b", "value": "Medium"}'>Medium</option>
                    <option value='{"key": "a", "value": "Low"}'>Low</option>
                </select>
            </div>


            {listItems.length !== 0 && <div id ="editButton">
                <button onClick={() => setEditable(!editable)}> {editable ? "Done" : "Edit Items"} </button>
            </div>}

            <div id="listItems" >
                {listItems.length!== 0 &&
                    <div id="labels">
                        <h2>Item</h2>
                        <h2>Priority</h2>
                    </div>
                }
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
                    {!editable && !hideCompletedItems &&
                    <button id="deleteCompleted"
                            onClick={() => setShowWarning(true)}>
                        Delete Completed Items
                    </button>
                    }
                </div>

            }

        </div>


    );

}
export default List;
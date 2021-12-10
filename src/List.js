import React, {useRef} from 'react';
import ListItem from './ListItem.js';
import Warning from './Warning.js';
import {useState, useEffect} from "react";
import './List.css';
import { CSSTransitionGroup } from 'react-transition-group';
import Toggle from "react-toggle";
import ShareScreen from "./ShareScreen";
import share from './share.png';


function List(props) {
    const [hideCompletedItems, setHideCompletedItems] = useState(false);
    const [editable, setEditable] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [newItemText, setNewItemText] = useState("");
    const [newItemPriority, setNewItemPriority] = useState({key: 0, value: "---"});
    const [listNameEditable, setListNameEditable] = useState(false);

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
            <button id="backButton"
                    onClick={() => {props.setSelectedListID(" "); props.setSelectedListName(" ");}}
                    aria-label="Back button to see all lists"
            >
                ← </button>

            {listNameEditable ?
                <div className="listName">
                    <input value={props.selectedListName}
                           onChange={(e) => props.onListNameChanged(props.id, e.target.value)}
                           onKeyPress={(e) => {
                               if (e.key === "Enter"){
                                   setListNameEditable(false);
                               }
                           }}
                           aria-label="Edit List Name"
                    >
                    </input>
                    <button onClick={() => setListNameEditable(false)}
                            aria-label="Save List Name">✅</button>
                </div>
                :
                <div className="listName">
                    <h1 aria-label="List Name">{props.selectedListName} </h1>
                    <button onClick={() => setListNameEditable(true)}
                            aria-label="Click to Edit List Name">✏️</button>
                </div>
            }
            {props.showShareScreenEmails && <input type="image"
                                                   src={share}
                                                   alt="share list"
                                                   id="shareListsFromList"
                                                   onClick={() => props.setShowShareScreenID(props.id)}/>}
            <div id="inputBox_Button">
                <button id="addItem"
                        tabindex="-1"
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
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               if (newItemText !== "") {
                                   props.onItemAdded(newItemText, newItemPriority);
                                   setNewItemText("");
                               }
                           }}}
                       value={newItemText}
                       disabled={editable}
                       aria-label="Enter new list item"
                />
            </div>
                <select id="selectPriority"
                        onChange={(e) => setNewItemPriority(JSON.parse(e.target.value))}
                        disabled={editable}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                if (newItemText !== "") {
                                    props.onItemAdded(newItemText, newItemPriority);
                                    setNewItemText("");
                                }
                            }}}
                        aria-label="Select new list item priority"
                        >
                    <option value='{"key": "0", "value": "--"}'>--Set Priority--</option>
                    <option value='{"key": "c", "value": "High"}'>High</option>
                    <option value='{"key": "b", "value": "Medium"}'>Medium</option>
                    <option value='{"key": "a", "value": "Low"}'>Low</option>
                </select>


            {listItems.length !== 0 &&
            <div id="sortItems">
                <select id="sortDropDown"
                        onChange={(e) => props.onSortItems(e.target.value)}
                        disabled={editable}>
                    <option value="">Sort by {sortLabels[props.sortField].name}: {sortLabels[props.sortField][props.sortDirection]}</option>
                    {dropDownOptions}
                </select>
            </div>
            }

            {(listItems.length !== 0 || editable) && <div id ="editButton">
                <button onClick={() => setEditable(!editable)}
                        aria-label={editable ? "Finished Editing" : "Edit List Items"}> {editable ? "Done" : "Edit Items"} </button>
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
                    transitionEnter={10}
                    transitionLeave={10}>
                {hideCompletedItems ? incompleteListItems :listItems}
                </CSSTransitionGroup>
            </div>


            {showWarning && <Warning data={props.data}
                                     onItemsDeleted={props.onItemsDeleted}
                                     onClose={() =>setShowWarning(false)}
            />}
            {(incompleteListItems.length !== listItems.length) &&

                // <div className="completedButtons">
                    <div id="hideCompletedItems">
                        <label className="toggleLabel" htmlFor="showCompletedItems">Hide Completed Items</label>
                        <Toggle id="showCompletedItems"
                                onChange={() => setHideCompletedItems(!hideCompletedItems)}/>
                    </div>
            }
            {(incompleteListItems.length !== listItems.length) &&
            !editable && !hideCompletedItems &&
            <button id="deleteCompleted"
                    onClick={() => setShowWarning(true)}>
                Delete Completed Items
            </button>
            }
            {(props.showShareScreenID !== null) && <ShareScreen
                onListShared={props.onListShared}
                showShareScreenID={props.showShareScreenID}
                setShowShareScreenID={props.setShowShareScreenID}
                showShareScreenEmails={props.showShareScreenEmails}
                onListUnshared={props.onListUnshared}
                user={props.user}
            />}

        </div>


    );

}
export default List;
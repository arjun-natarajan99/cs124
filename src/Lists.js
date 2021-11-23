import './Lists.css';
import {useCollection} from "react-firebase-hooks/firestore";
import React, {useState} from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import {useLoading, Oval} from "@agney/react-loading";

const collectionName = "lists";

function Lists(props){
    const [newListText, setNewListText] = useState("");
    const query = props.db.collection(collectionName).orderBy(props.sortListField, props.sortListDirection);
    const collection = props.db.collection(collectionName);
    const [value, loading, error] = useCollection(query);

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        //Width selector does not work as intended when placed in css Stylesheet
        indicator: <Oval width="30"/>
    });

    if (loading){
        return <div className="loading">
            <h1> Hang tight...</h1>
            <section {...containerProps}>
                {indicatorEl} {/* renders only while loading */}
            </section>
        </div>
    }

    let data = null;

    if (value) {
        data = value.docs.map(a => a.data());
    }
    const sortLabels = {
        created: {name: "Creation Date", asc: "Old → New", desc: "New → Old"},
        name: {name: "Name", desc: "Z → A", asc: "A → Z"}
    };
    let dropDownOptions = [];
    for(let field in sortLabels){
        if (field !== "order") {
            for (let direction of ["desc", "asc"]) {
                if (props.sortListField !== field || props.sortListDirection !== direction) {
                    dropDownOptions.push(
                        <option value={`${field} ${direction}`}>Sort
                            by {sortLabels[field].name}: {sortLabels[field][direction]}</option>);
                }
            }
        }
    }
    const lists = data.map(a =>
        <div id="li">
            <p id="listName"
               tabIndex={0}
               onClick={() =>
               {
                props.setSelectedListID(a.id);
                props.setSelectedListName(a.name);
               }}
               onKeyPress={(e) => {
                   if(e.key === "Enter" || e.key === " ") {
                       props.setSelectedListID(a.id);
                       props.setSelectedListName(a.name);
                   }
                }}
               role="button"
               aria-label={`Select List with Name ${a.name}`}
            >{a.name}</p>
            <button id="deleteList" onClick={() => props.onListDeleted(a.id)}
                    aria-label={`Delete List with Name ${a.name}`}>x</button>
        </div>
    );
    return (<div id="lists">
            <h1>To-Do Lists</h1>
            <div id="newListComponents">
                <button id="addList"
                        tabIndex="-1"
                        className={newListText ? "enabled" : "disabled"}
                        onClick={(e)=> {
                            if (newListText !== "") {
                                props.onListAdded(newListText);
                                setNewListText("");
                            }
                        }}
                >
                    +
                </button>
                <input id = "inputList"
                       type={'text'}
                       placeholder={"Create New List..."}
                       aria-label={`Create new List with name ${newListText}`}
                       onChange={(e) => setNewListText(e.target.value)}
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               if (newListText !== "") {
                                   props.onListAdded(newListText);
                                   setNewListText("");
                               }
                           }}}
                       value={newListText}
                      />
            </div>
            {lists.length !== 0 &&
                <div id="sortList">
                    <select id="sortDropDown"
                            onChange={(e) => props.onSortLists(e.target.value)}
                    >
                        <option value="">Sort by {sortLabels[props.sortListField].name}:
                            {sortLabels[props.sortListField][props.sortListDirection]}</option>
                        {dropDownOptions}
                    </select>
                </div>
            }

            <div id="listsDiv">
                <h2 id="yourLists">Your Lists</h2>
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnter={300}
                        transitionLeave={300}>
                        {lists}
                    </CSSTransitionGroup>
            </div>


        </div>
    );
}
export default Lists;
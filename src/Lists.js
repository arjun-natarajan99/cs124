import './Lists.css';
import {useCollection} from "react-firebase-hooks/firestore";
import React, {useState} from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import {useLoading, Oval} from "@agney/react-loading";
import share from "./share.png";
import ShareScreen from "./ShareScreen";
import './ShareScreen.css';
import dropdown from "./dropdown.png";
import {useMediaQuery} from "react-responsive";


function Lists(props){
    const [newListText, setNewListText] = useState("");
    const [showLogout, setShowLogout] = useState(false);
    const hideUsername = useMediaQuery({maxWidth:650});

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        //Width selector does not work as intended when placed in css Stylesheet
        indicator: <Oval width="30"/>
    });

    if (props.loading){
        return <div className="loading">
            <h1> Hang tight...</h1>
            <section {...containerProps}>
                {indicatorEl} {/* renders only while loading */}
            </section>
        </div>
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
    function generateLists(a, isOwner){
        return (<div id="li">
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
            {isOwner &&
                <input type='image'
                       id="shareLists"
                       src={share}
                       alt="share list"
                       onClick={() => {
                         props.setShowShareScreenID(a.id);
                         props.setShowShareScreenEmails(a.sharedWith);
                     }}
                />
            }
            {isOwner && <button className="listsButton" id="deleteList" onClick={() => props.onListDeleted(a.id)}
                    aria-label={`Delete List with Name ${a.name}`}>x</button>}
            {!isOwner && <button className="listsButton" onClick={() => props.onListUnshared(a.id, props.user.email, false)}> Unshare with Me</button>}
        </div>);
    }
    const yourLists = props.data.map(a => generateLists(a, true));
    const sharedLists = props.sharedData.map(a => generateLists(a,false));

    return (<div id="lists">
            <h1>To-Do Lists</h1>
                {hideUsername ?
                    <div id="verifyAndLogout">
                        {!props.user.emailVerified && <button type="button" id="verify" onClick={props.verifyEmail}>Verify email</button>}
                        <button type="button" id="alternateLogOut" onClick={() => props.auth.signOut()}>Log Out</button>
                    </div>
                    :
                    <div id="usernameLogOut">
                        <p id="username"
                           onClick={() => setShowLogout(!showLogout)}
                        >{!hideUsername && props.user.email}<input type="image" src={dropdown} alt="dropdown"/></p>

                        {showLogout && !props.user.emailVerified && <button type="button" id="verify" onClick={props.verifyEmail}>Verify email</button>}
                        {showLogout && <button type="button" id="logOut" onClick={() => props.auth.signOut()}>Log Out</button>}
                    </div>
                }

            <div id="newListComponents">
                <button id="addList"
                        tabIndex="-1"
                        className= {`listsButton ${newListText ? "enabled" : "disabled"}`}
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
            {yourLists.length + sharedLists.length !== 0 &&
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
                <h2 id="yourListsHeader">Your Lists</h2>
                <div className="lists">
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnter={300}
                        transitionLeave={300}>
                        {yourLists}
                    </CSSTransitionGroup>
                </div>
                <h2 id="sharedLists">Lists Shared with You</h2>
                <div className="lists">
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnter={300}
                        transitionLeave={300}>
                        {sharedLists}
                    </CSSTransitionGroup>
                </div>
            </div>
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
export default Lists;
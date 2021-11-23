import React from 'react';
import './ListItem.css';
import {useRef, useEffect} from "react";
import SelectionMaintainingInput from "./SelectionMaintainingInput";

function ListItem(props) {
    let item = <div id={props.editable ? "editableItems" : "nonEditableItems"}>
        <input type={'checkbox'}
               id={props.id}
               checked={props.checked}
               disabled={props.editable}
               onChange={(e) =>
                {if (!props.editable) {props.onItemChanged(props.id,"checked", !props.checked); } }}
               aria-label={props.checked ? `Unmark ${props.item} as completed.`: `Mark ${props.item} as completed.`}
        />

        <SelectionMaintainingInput id={props.id}
                                   className={`${props.editable ? "editableItem" : "nonEditableItem"} ${props.checked ? "checked" : "unchecked"}`}
                                   value={props.item}
                                   readOnly={!props.editable}
                                   onChange={(e) => {if (props.editable) {props.onItemChanged(props.id,
                                       "item", e.target.value); }}}
                                   onClick={() => {if (!props.editable){props.onItemChanged(props.id,"checked", !props.checked);}}}/>

        {props.editable ? <select id="priorityDropDownEditable"
                                  onChange={(e) => props.onItemChanged(props.id,
                                      "priority",
                                      JSON.parse(e.target.value))
                                  }
                                  aria-label={`Edit ${props.item} priority.`}>
                <option value="">{props.priority.value}</option>
                {props.priority.value !== "High" && <option value=' {"key": "c", "value": "High"}'>High</option>}
                {props.priority.value !== "Medium" && <option value=' {"key": "b", "value": "Medium"}'>Medium</option>}
                {props.priority.value !== "Low" && <option value=' {"key": "a", "value": "Low"}'>Low</option>}
            </select>
            :
            <><p className={`${props.checked ? "checked" : "unchecked"}`}
               id="priority">
                {props.priority.value}</p>
                <button id="deleteItem"
                        onClick={() => props.onItemsDeleted([props.id])}
                        aria-label={`Delete ${props.item}`}> x</button></>
        }

    </div>
    return (
        <div key={props.id}
            id="listItem">
            {item}
        </div>
    );
}
export default ListItem;
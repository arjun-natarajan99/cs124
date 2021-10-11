import React from 'react';
import './ListItem.css';

function ListItem(props) {
    return (
        <div key={props.id}>
            <input type={'checkbox'} id={props.id} checked={props.checked} onClick={() => props.onToggleItemChecked(props.id)}/>
            <label htmlFor={props.id}>{props.item}</label>
        </div>
    );
}
export default ListItem;
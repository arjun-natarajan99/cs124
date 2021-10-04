import React from 'react';

function ListItem(props) {
    return (
        <div key={props.id}>
            <input type={'checkbox'} id={props.id} checked={props.checked}/>
            <label htmlFor={props.id}>{props.item}</label>
        </div>
    );
}
export default ListItem;
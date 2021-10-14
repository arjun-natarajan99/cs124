import React from 'react';
import './ListItem.css';

function ListItem(props) {
    return (
        <div key={props.id}>
            {props.editable ?
                <div id="editableItems">
                    <input type={'checkbox'}
                           id={props.id}
                           checked={props.checked}
                    />
                    <textarea
                           id={props.id}
                    value={props.item}
                    onChange={(e) => props.onItemChanged(props.id, "item", e.target.value) }
                    />
                </div>
                :
                <div id="nonEditableItems">
                    <input type={'checkbox'}
                       id={props.id}
                       checked={props.checked}
                       onChange={() => props.onItemChanged(props.id,"checked", !props.checked)}
                    />
                    <textarea
                           class={"nonEditableItem"}
                           id={props.id}
                           value={props.item}
                           readOnly
                           onClick={() => props.onItemChanged(props.id,"checked", !props.checked)}
                    />
                </div>

            }
        </div>
    );
}
export default ListItem;
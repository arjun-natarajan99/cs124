import React, {useState} from 'react';
import App from './App.js';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function InMemoryApp(props) {
    const [data, setData] = useState(props.initialData);

    function onItemAdded(item) {
        let newItem = [{id: generateUniqueID(), item:item, checked:false}];
        setData(data.concat(newItem));
    }

    function onItemsDeleted(ids) {
        setData(data.filter((item) => !ids.includes(item.id)));
    }

    // function onToggleItemChecked(id) {
    //     function helper(a) {
    //         if (a.id === id) {
    //             a.checked = !a.checked;
    //         }
    //         return a;
    //     }
    //     setData(data.map(a => helper(a)));
    // }

    function onItemChanged(id, field, newVal){
        function helper(a) {
            if (a.id === id){
                a[field] = newVal;
            }
            return a;
        }
        setData(data.map(helper));
    }

    return <App data={data}
                onItemAdded={onItemAdded}
                onItemsDeleted={onItemsDeleted}
                onItemChanged={onItemChanged}
    />
}

export default InMemoryApp;
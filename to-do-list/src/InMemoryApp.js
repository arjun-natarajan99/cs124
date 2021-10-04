import React, {useState} from 'react';
import App from './App.js';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function InMemoryApp(props) {
    const [data, setData] = useState(props.initialData);
    function onItemAdded( item) {
        let newItem = [{id: generateUniqueID(), item:item, checked:false}];
        setData(data.concat(newItem));
    }

    function onItemsDeleted(ids) {
        setData(data.filter((item) => !ids.includes(item.id)));
        console.log(ids);
    }

    return <App data={data} onItemAdded={onItemAdded} onItemsDeleted={onItemsDeleted}/>
}

export default InMemoryApp;
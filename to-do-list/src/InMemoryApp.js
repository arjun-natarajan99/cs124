import React, {useState} from 'react';
import App from './App.js';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function InMemoryApp(props) {
    const [data, setData] = useState(props.initialData);
    function onItemAdded( item, checked) {
        let newItem = [{id: generateUniqueID(), item:item, checked:checked}];
        setData(data.concat(newItem));
    }
    return <App data={data} onItemAdded={onItemAdded}/>
}

export default InMemoryApp;
import React, {useState} from 'react';
import List from "./List.js";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6K4Ycqr1bST4Zkkr_tTKRzEOQ5n9aY6o",
    authDomain: "cs124-lab3-33ef0.firebaseapp.com",
    projectId: "cs124-lab3-33ef0",
    storageBucket: "cs124-lab3-33ef0.appspot.com",
    messagingSenderId: "283056924726",
    appId: "1:283056924726:web:12cc1133aa2ec5ffba1097",
    measurementId: "G-E3QVKSNMGJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionName = "to-do-list";

function InMemoryApp(props) {
    const [sortField, setSortField] = useState("created");
    const [sortDirection, setSortDirection] = useState("desc");
    const query = db.collection(collectionName).orderBy(sortField, sortDirection);
    const collection = db.collection(collectionName);
    const [value, loading, error] = useCollection(query);

    function onItemAdded(item, priority) {
        const newId = generateUniqueID();
        let newItem = {id: newId,
            item:item,
            checked: false,
            created: firebase.database.ServerValue.TIMESTAMP,
            priority: priority,
            order: null};
        const docRef = collection.doc(newId);
        docRef.set(newItem);
    }

    function onItemsDeleted(ids) {
        for(let id of ids) {
            const docRef = collection.doc(id);
            docRef.delete();
        }
    }

    function onSortItems(sort) {
        const [newSortField, newSortDirection] = sort.split(' ');
        setSortField(newSortField);
        setSortDirection(newSortDirection);
    }

    function onItemChanged(id, field, newVal){
        const docRef = collection.doc(id);
        docRef.update({[field]:newVal});
    }

    if (loading){
        return <div>
            <h1> Loading </h1>
        </div>
    }

    let data = null;

    if (value) {
        data = value.docs.map(a => a.data());
    }

    return <List data={data}
                 onItemAdded={onItemAdded}
                 onItemsDeleted={onItemsDeleted}
                 onItemChanged={onItemChanged}
                 onSortItems={onSortItems}
                 sortDirection={sortDirection}
                 sortField={sortField}

    />

}

export default InMemoryApp;
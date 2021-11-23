import React, {useState} from 'react';
import List from "./List.js";
import Lists from "./Lists";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {CSSTransitionGroup} from "react-transition-group";
import {useLoading, Oval} from "@agney/react-loading";

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



function App() {
    const [selectedListID,setSelectedListID] = useState(" ");
    const [selectedListName, setSelectedListName] = useState(" ");
    const [sortItemsField, setSortItemsField] = useState("created");
    const [sortItemsDirection, setSortItemsDirection] = useState("desc");
    const [sortListField, setSortListField] = useState("created");
    const [sortListDirection, setSortListDirection] = useState("desc");


    const query = db.collection("lists").doc(selectedListID)
        .collection(collectionName).orderBy(sortItemsField, sortItemsDirection);

    const collection = db.collection("lists").doc(selectedListID).collection(collectionName);
    const [value, loading, error] = useCollection(query);

    function onListAdded(listName) {
        const newId = generateUniqueID();
        let newList = {id: newId,
            name: listName,
            created: firebase.firestore.FieldValue.serverTimestamp()
        };
        const docRef = db.collection("lists").doc(newId);
        docRef.set(newList);
    }
    function onListDeleted(listId) {
        const docRef = db.collection("lists").doc(listId);
        docRef.delete();
    }
    function onListNameChanged(listId, newName) {
        setSelectedListName(newName);
        const docRef = db.collection("lists").doc(listId);
        docRef.update({name: newName});
    }
    function onItemAdded(item, priority) {
        const newId = generateUniqueID();
        let newItem = {id: newId,
            item: item,
            checked: false,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            priority: priority
        };
        const docRef = collection.doc(newId);
        docRef.set(newItem);
    }

    function onItemsDeleted(ids) {
        for(let id of ids) {
            const docRef = collection.doc(id);
            docRef.delete();
        }
    }

    function onSortLists(sort) {
        const [newSortField, newSortDirection] = sort.split(' ');
        setSortListField(newSortField);
        setSortListDirection(newSortDirection);
    }

    function onSortItems(sort) {
        const [newSortField, newSortDirection] = sort.split(' ');
        setSortItemsField(newSortField);
        setSortItemsDirection(newSortDirection);
    }

    function onItemChanged(id, field, newVal){
        const docRef = collection.doc(id);
        docRef.update({[field]:newVal});
    }

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        //Width selector does not work as intended when placed in css Stylesheet
        indicator: <Oval width="30"/>
    });

    if (loading){
        return (<div className="loading">
                <h1> Hang tight...</h1>
                <section {...containerProps}>
                    {indicatorEl} {/* renders only while loading */}
                </section>
            </div>
        )
    }

    let data = null;
    if (value) {
        data = value.docs.map(a => a.data());
    }
    // let list = <List data={data}
    //                  onItemAdded={onItemAdded}
    //                  onItemsDeleted={onItemsDeleted}
    //                  onItemChanged={onItemChanged}
    //                  onSortItems={onSortItems}
    //                  sortDirection={sortDirection}
    //                  sortField={sortField}
    //
    // />;
    return (
        <div id="app">
        {selectedListID !== " " ?
            <CSSTransitionGroup
                transitionName="fade"
            transitionEnter={300}
            transitionLeave={300}>
                <List data={data}
                      onItemAdded={onItemAdded}
                      onItemsDeleted={onItemsDeleted}
                      onItemChanged={onItemChanged}
                      onSortItems={onSortItems}
                      onListNameChanged={onListNameChanged}
                      sortDirection={sortItemsDirection}
                      sortField={sortItemsField}
                      selectedListID={selectedListID}
                      setSelectedListID={setSelectedListID}
                      selectedListName={selectedListName}
                      setSelectedListName={setSelectedListName}
                >
                </List>
            </CSSTransitionGroup>
                :
                <Lists db={db}
                       setSelectedListID={setSelectedListID}
                       setSelectedListName={setSelectedListName}
                       collection={collection}
                       data={data}
                       onListAdded={onListAdded}
                       onListDeleted={onListDeleted}
                       sortListField={sortListField}
                       sortListDirection={sortListDirection}
                       setSortListField={setSortListField}
                       setSortListDiretion={setSortListDirection}
                       onSortLists={onSortLists}
                >
                </Lists>
        }
        </div>

    )

}

export default App;
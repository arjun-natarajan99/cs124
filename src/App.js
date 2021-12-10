import React, {useState} from 'react';
import List from "./List.js";
import Lists from "./Lists";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {CSSTransitionGroup} from "react-transition-group";
import {useLoading, Oval} from "@agney/react-loading";
import { useAuthState,
    useSignInWithEmailAndPassword,
    useCreateUserWithEmailAndPassword
} from "react-firebase-hooks/auth";
import './App.css';
import googleLogo from"./google-logo.png";
import { useMediaQuery } from "react-responsive";

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
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const collectionName = "to-do-list";
const listsCollectionName = "lists5";

function App() {
    const [user, loading, error] = useAuthState(auth);
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        //Width selector does not work as intended when placed in css Stylesheet
        indicator: <Oval width="30"/>
    });

    function verifyEmail() {
        auth.currentUser.sendEmailVerification();
    }

    if (loading){
        return (<div className="loading">
                <h1> Hang tight...</h1>
                <section {...containerProps}>
                    {indicatorEl} {/* renders only while loading */}
                </section>
            </div>
        )
    }
    else if (user) {
        return (<div>
            <SignedInApp user={user} verifyEmail={verifyEmail}/>
        </div>)
    }
    else {
        return <div id="signInPage">
            {error && <p>Error App: {error.message}</p>}
            <h1 id="title">To-Do List</h1>
            <div id="signInUp">
                <div id="signIn">
                    <h2>Have an account? Sign in!</h2>
                    <SignIn key="Sign In"/>
                </div>
                <div id='signUp'>
                    <h2>Don't have one? Sign up!</h2>
                    <SignUp key="Sign Up"/>
                </div>
            </div>
        </div>
    }

}
function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const isNarrow = useMediaQuery({maxWidth:540});

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Logging in…</p>
    }
    return <div>
        {error && <p>"Error logging in: " {error.message}</p>}
        <div className="inputs">
            <input type={"text"}
                   id={"email"}
                   placeholder={"Email"}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type={"password"}
                   id={"password"}
                   placeholder={"Password"}
                   onChange={(e) => setPassword(e.target.value)}
                   onKeyPress={(e) => {
                       if (e.key === "Enter"){
                           signInWithEmailAndPassword(email, password);
                       }
                   }
                   }
            />
        </div>
        <button className="submit"
            onClick={() =>
            signInWithEmailAndPassword(email, password)}>
            Log in
        </button>
        <p id="or"><span>or</span></p>
        <button id="logInGoogle"
                className="submit"
                onClick={() =>
                    auth.signInWithPopup(googleProvider)}>
                    <img id="googleLogo" src={googleLogo} alt="Login with Google"/>
            {!isNarrow && "Login with Google"}
        </button>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState("");
    const [verifyPassword,setVerifyPassword] = useState(null);
    const [noMatch, setNoMatch] = useState(false);
    const [tooShort, setTooShort] = useState(false);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <div className="inputs">
            <input type={"text"}
                   id={"email"}
                   placeholder={"Email"}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type={"password"}
                   id={"password"}
                   placeholder={"Password"}
                   onChange={(e) => setPassword(e.target.value)}
            />
            <input type={"password"}
                   id={"verify password"}
                   placeholder={"Verify Password"}
                   onChange={(e) => {setVerifyPassword(e.target.value)}}
            />
            {password.length > 0 ?
                password === verifyPassword ? password.length < 9 ? <p className="passwordHint">Passwords must be greater than 8 characters.</p> :
                    <p className="passwordHint">Passwords match!</p> :
                    <p className="passwordHint">Oops, your passwords don't match...</p> : ""}

            {noMatch && <p> Passwords must match.</p>}
            {tooShort && <p> Password must be greater than 8 characters.</p>}
        </div>
        <button className="submit"
            onClick={() =>{
            if (password === verifyPassword) {

                if (password.length > 8) {
                    createUserWithEmailAndPassword(email, password);
                }
                else {
                    setTooShort(true);
            }

            }
            else{
                setNoMatch(true);
            }
        }}>
            Sign Up
        </button>

    </div>
}

function SignedInApp(props) {
    const [selectedListID,setSelectedListID] = useState(" ");
    const [selectedListName, setSelectedListName] = useState(" ");
    const [sortItemsField, setSortItemsField] = useState("created");
    const [sortItemsDirection, setSortItemsDirection] = useState("desc");
    const [sortListField, setSortListField] = useState("created");
    const [sortListDirection, setSortListDirection] = useState("desc");

    const [showShareScreenID, setShowShareScreenID] = useState(null);
    const [showShareScreenEmails, setShowShareScreenEmails] = useState([]);

    //queries for List Component
    const listQuery = db.collection(listsCollectionName).doc(selectedListID)
        .collection(collectionName).orderBy(sortItemsField, sortItemsDirection);
    const listCollection = db.collection(listsCollectionName).doc(selectedListID).collection(collectionName);
    const [listValue, listLoading, listError] = useCollection(listQuery);

    //queries for Lists Component
    const listsQuery = db.collection(listsCollectionName)
        .where('owner', '==', props.user.uid)
        .orderBy(sortListField, sortListDirection);
    const listsCollection = db.collection(listsCollectionName);
    const [listsValue, listsLoading, listsError] = useCollection(listsQuery);

    //queries for shared Lists - need to be passed to lists
    const sharedQuery = db.collection(listsCollectionName)
        .where("sharedWith", "array-contains", props.user.email)
        .orderBy(sortListField, sortListDirection);
    const [sharedValue, sharedLoading, sharedError] = useCollection(sharedQuery);


    let listData = [];
    let listsData = [];
    let sharedData = [];

    if (listValue) {
        listData = listValue.docs.map(a => a.data());
    }
    if (listsValue) {
        listsData = listsValue.docs.map(a => a.data());
    }

    if (sharedValue && props.user.emailVerified) {
        sharedData = sharedValue.docs.map(a => a.data());
    }

    function onListAdded(listName) {
        const newId = generateUniqueID();
        let newList = {id: newId,
            name: listName,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            owner: props.user.uid,
            sharedWith: []
        };
        const docRef = db.collection(listsCollectionName).doc(newId);
        docRef.set(newList);
    }
    function onListDeleted(listId) {
        const docRef = db.collection(listsCollectionName).doc(listId);
        let idsToDelete = listData.map(a => a.id);
        onItemsDeleted(idsToDelete);
        docRef.delete();

    }
    function onListNameChanged(listId, newName) {
        setSelectedListName(newName);
        const docRef = db.collection(listsCollectionName).doc(listId);
        docRef.update({name: newName});
    }
    function onListShared(listId, emails){
        const docRef = db.collection(listsCollectionName).doc(listId);
        const list = listsData.filter(a => a.id === listId);
        emails = emails.filter(a => a !== props.user.email);
        docRef.update({sharedWith: [...list[0].sharedWith, ...emails]});
    }
    function onListUnshared(listId, email, isOwner){
        const docRef = db.collection(listsCollectionName).doc(listId);
        let list = [];
        if (isOwner){
            list = listsData.filter(a => a.id === listId);
        }
        else{
            list = sharedData.filter(a => a.id === listId);
        }
        docRef.update({sharedWith: list[0].sharedWith.filter(a => a !== email)});
        setShowShareScreenEmails(showShareScreenEmails.filter(a => a !== email));
    }

    function onItemAdded(item, priority) {
        const newId = generateUniqueID();
        let newItem = {id: newId,
            item: item,
            checked: false,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            priority: priority
        };
        const docRef = listCollection.doc(newId);
        docRef.set(newItem);
    }

    function onItemsDeleted(ids) {
        for(let id of ids) {
            const docRef = listCollection.doc(id);
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
        const docRef = listCollection.doc(id);
        docRef.update({[field]:newVal});
    }

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        //Width selector does not work as intended when placed in css Stylesheet
        indicator: <Oval width="30"/>
    });

    if (listLoading){
        return (<div className="loading">
                <h1> Hang tight...</h1>
                <section {...containerProps}>
                    {indicatorEl} {/* renders only while loading */}
                </section>
            </div>
        )
    }

    return (
        <div id="app">
        {selectedListID !== " " ?
            <CSSTransitionGroup
                transitionName="fade"
            transitionEnter={300}
            transitionLeave={300}>
                <List data={listData}
                      id={selectedListID}
                      onItemAdded={onItemAdded}
                      onItemsDeleted={onItemsDeleted}
                      onItemChanged={onItemChanged}
                      onSortItems={onSortItems}
                      onListNameChanged={onListNameChanged}
                      sortDirection={sortItemsDirection}
                      sortField={sortItemsField}
                      setSelectedListID={setSelectedListID}
                      selectedListName={selectedListName}
                      setSelectedListName={setSelectedListName}
                      onListShared={onListShared}
                      onListUnshared={onListUnshared}
                      showShareScreenID={showShareScreenID}
                      setShowShareScreenID={setShowShareScreenID}
                      showShareScreenEmails={listsData.filter(a => a.id === selectedListID).length > 0 ?  listsData.filter(a => a.id === selectedListID)[0].sharedWith : null}
                >
                </List>
            </CSSTransitionGroup>
                :
                <Lists db={db}
                       loading={listsLoading}
                       error={listsError}
                       data={listsData}
                       sharedData={sharedData}
                       sharedLoading={sharedLoading}
                       sharedError={sharedError}
                       user={props.user}
                       auth={auth}
                       verifyEmail={props.verifyEmail}
                       collectionName={listsCollectionName}
                       setSelectedListID={setSelectedListID}
                       setSelectedListName={setSelectedListName}
                       collection={listCollection}
                       onListAdded={onListAdded}
                       onListDeleted={onListDeleted}
                       sortListField={sortListField}
                       sortListDirection={sortListDirection}
                       setSortListField={setSortListField}
                       setSortListDiretion={setSortListDirection}
                       onSortLists={onSortLists}
                       onListShared={onListShared}
                       onListUnshared={onListUnshared}
                       showShareScreenID={showShareScreenID}
                       setShowShareScreenID={setShowShareScreenID}
                       showShareScreenEmails={showShareScreenEmails}
                       setShowShareScreenEmails={setShowShareScreenEmails}
                >
                </Lists>
        }
        </div>

    )

}

export default App;
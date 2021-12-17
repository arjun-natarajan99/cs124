import React, {useState} from 'react';
import List from './List.js';
import Lists from './Lists.js';
import {generateUniqueID} from 'web-vitals/dist/modules/lib/generateUniqueID';
import firebase from 'firebase/compat';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useLoading, Oval} from '@agney/react-loading';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import {useMediaQuery} from 'react-responsive';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyB6K4Ycqr1bST4Zkkr_tTKRzEOQ5n9aY6o',
  authDomain: 'cs124-lab3-33ef0.firebaseapp.com',
  projectId: 'cs124-lab3-33ef0',
  storageBucket: 'cs124-lab3-33ef0.appspot.com',
  messagingSenderId: '283056924726',
  appId: '1:283056924726:web:12cc1133aa2ec5ffba1097',
  measurementId: 'G-E3QVKSNMGJ',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const collectionName = 'to-do-list';
const listsCollectionName = 'lists5';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    marginLeft: 10,
  },
  signInUp: {
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    height: 500,
  },
  form:{
    paddingLeft: 10,
    paddingRight: 10,
  },
  subTitle:{
    fontSize: 18,
    fontWeight: '500',
  },
  input:{
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    height: 60,
  },
  submit:{
    backgroundColor: "#3E7FC6",
    width: 80,
    height: 40,
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  logIn:{
    flexDirection: "row-reverse",
    paddingTop: 10,
    alignItems: 'center',
    height: 40,
  },
  buttonText:{
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
});

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  function verifyEmail() {
    auth.currentUser.sendEmailVerification();
  }

  if (loading) {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text> Hang tight...</Text>
      </SafeAreaView>
    );
  } else if (user) {
    return (
      <View>
        <SignedInApp user={user} verifyEmail={verifyEmail} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.app}>
        {error && <Text>Error App: {error.message}</Text>}
        <Text style={styles.title}>
          To-Do List
        </Text>
        <View style={styles.signInUp}>
          <View style={styles.form}>
            <Text style={styles.subTitle}>Have an account? Sign in!</Text>
            <SignIn key="Sign In" />
          </View>
          <View style={styles.form}>
            <Text style={styles.subTitle}>Don't have one? Sign up!</Text>
            <SignUp key="Sign Up" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};
function SignIn() {
  const [signInWithEmailAndPassword, userCredential, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  if (userCredential) {
    // Shouldn't happen because App should see that
    // we are signed in.
    return <View>Unexpectedly signed in already</View>;
  } else if (loading) {
    return <Text>Logging in…</Text>;
  }
  return (
    <View>
      {error && <Text>"Error logging in: " {error.message}</Text>}
      <View className="inputs">
        <TextInput
          style={styles.input}
          placeholder={'Email'}
          onChangeText={e => setEmail(e)}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          onChangeText={e => setPassword(e)}
          autoCapitalize={'none'}
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.logIn}>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => signInWithEmailAndPassword(email, password)}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SignUp() {
  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [noMatch, setNoMatch] = useState(false);
  const [tooShort, setTooShort] = useState(false);

  if (userCredential) {
    // Shouldn't happen because App should see that
    // we are signed in.
    return <View>Unexpectedly signed in already</View>;
  } else if (loading) {
    return <Text>Signing up…</Text>;
  }
  return (
    <View>
      {error && <Text>"Error signing up: " {error.message}</Text>}
      <View className="inputs">
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={e => setEmail(e)}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          onChangeText={e => setPassword(e)}
          autoCapitalize={'none'}
          autoCorrect={false}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Verify Password"
          onChangeText={e => setVerifyPassword(e)}
          autoCapitalize={'none'}
          autoCorrect={false}
          secureTextEntry={true}
        />
        {password.length > 0 ? (
          password === verifyPassword ? (
            password.length < 9 ? (
              <Text className="passwordHint">
                Passwords must be greater than 8 characters.
              </Text>
            ) : (
              <Text className="passwordHint">Passwords match!</Text>
            )
          ) : (
            <Text>Oops, your passwords don't match...</Text>
          )
        ) : (
          <Text />
        )}

        {noMatch && <Text> Passwords must match.</Text>}
        {tooShort && <Text> Password must be greater than 8 characters.</Text>}
      </View>
      <View style={styles.logIn}>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            if (password === verifyPassword) {
              if (password.length > 8) {
                createUserWithEmailAndPassword(email, password);
              } else {
                setTooShort(true);
              }
            } else {
              setNoMatch(true);
            }
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SignedInApp(props) {
  const [selectedListID, setSelectedListID] = useState(' ');
  const [selectedListName, setSelectedListName] = useState(' ');
  const [sortItemsField, setSortItemsField] = useState('created');
  const [sortItemsDirection, setSortItemsDirection] = useState('desc');
  const [sortListField, setSortListField] = useState('created');
  const [sortListDirection, setSortListDirection] = useState('desc');

  const [showShareScreenID, setShowShareScreenID] = useState(null);
  const [showShareScreenEmails, setShowShareScreenEmails] = useState([]);

  //queries for List Component
  const listQuery = db
    .collection(listsCollectionName)
    .doc(selectedListID)
    .collection(collectionName)
    .orderBy(sortItemsField, sortItemsDirection);
  const listCollection = db
    .collection(listsCollectionName)
    .doc(selectedListID)
    .collection(collectionName);
  const [listValue, listLoading, listError] = useCollection(listQuery);

  //queries for Lists Component
  const listsQuery = db
    .collection(listsCollectionName)
    .where('owner', '==', props.user.uid)
    .orderBy(sortListField, sortListDirection);
  const listsCollection = db.collection(listsCollectionName);
  const [listsValue, listsLoading, listsError] = useCollection(listsQuery);

  //queries for shared Lists - need to be passed to lists
  const sharedQuery = db
    .collection(listsCollectionName)
    .where('sharedWith', 'array-contains', props.user.email)
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
    let newList = {
      id: newId,
      name: listName,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: props.user.uid,
      sharedWith: [],
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
  function onListShared(listId, emails) {
    const docRef = db.collection(listsCollectionName).doc(listId);
    const list = listsData.filter(a => a.id === listId);
    emails = emails.filter(a => a !== props.user.email);
    docRef.update({sharedWith: [...list[0].sharedWith, ...emails]});
  }
  function onListUnshared(listId, email, isOwner) {
    const docRef = db.collection(listsCollectionName).doc(listId);
    let list = [];
    if (isOwner) {
      list = listsData.filter(a => a.id === listId);
    } else {
      list = sharedData.filter(a => a.id === listId);
    }
    docRef.update({sharedWith: list[0].sharedWith.filter(a => a !== email)});
    setShowShareScreenEmails(showShareScreenEmails.filter(a => a !== email));
  }

  function onItemAdded(item, priority) {
    const newId = generateUniqueID();
    let newItem = {
      id: newId,
      item: item,
      checked: false,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      priority: priority,
    };
    const docRef = listCollection.doc(newId);
    docRef.set(newItem);
  }

  function onItemsDeleted(ids) {
    for (let id of ids) {
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

  function onItemChanged(id, field, newVal) {
    const docRef = listCollection.doc(id);
    docRef.update({[field]: newVal});
  }

  if (listLoading) {
    return (
      <SafeAreaView className="loading" style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Hang tight...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View id="app">
      {selectedListID !== ' ' ? (
        <List
          data={listData}
          user={props.user}
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
          showShareScreenEmails={
            listsData.filter(a => a.id === selectedListID).length > 0
              ? listsData.filter(a => a.id === selectedListID)[0].sharedWith
              : null
          }></List>
      ) : (
        <Lists
          db={db}
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
          setSortListDirection={setSortListDirection}
          onSortLists={onSortLists}
          onListShared={onListShared}
          onListUnshared={onListUnshared}
          showShareScreenID={showShareScreenID}
          setShowShareScreenID={setShowShareScreenID}
          showShareScreenEmails={showShareScreenEmails}
          setShowShareScreenEmails={setShowShareScreenEmails}></Lists>
      )}
    </View>
  );
}

export default App;

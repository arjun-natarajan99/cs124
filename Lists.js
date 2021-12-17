import React, {useState} from 'react';
import {useLoading, Oval} from '@agney/react-loading';
import share from './share.png';
import ShareScreen from './ShareScreen.js';
import dropdown from './dropdown.png';
import {useMediaQuery} from 'react-responsive';
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: '900',
    marginLeft: 10,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  subTitle: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  username: {
    fontSize: 18,
    textAlign: 'right',
    marginRight: 10,
  },
  submit: {
    backgroundColor: '#3E7FC6',
    width: 80,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  logIn: {
    flexDirection: 'row-reverse',
    paddingTop: 10,
    alignItems: 'center',
    height: 40,
    marginTop: 10,
  },
  logOut: {
    backgroundColor: '#E14545',
    width: 80,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    borderTopWidth: 1,
    height: 60,
    width: 300,
  },
  newListComponents: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  addListEnabled: {
    backgroundColor: '#3E7FC6',
    width: 60,
    height: 60,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  addListDisabled: {
    backgroundColor: '#27517f',
    width: 60,
    height: 60,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  sortList: {
    borderWidth: 1,
    borderColor: 'darkgray',
    marginRight:10,
    marginLeft:10,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
  },
  list: {
    borderWidth: 1,
    borderColor: 'darkgray',
    marginRight:10,
    marginTop: 10,
    marginLeft:10,
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listName: {
    fontSize: 15,
    fontWeight: "700",
  },
  shareDelete: {
    flexDirection: 'row',
  },
  deleteList: {
    backgroundColor: '#E14545',
    width: 30,
    height: 30,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  unshareList: {
    backgroundColor: '#E14545',
    height: 30,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  share: {
    marginRight: 10,
    justifyContent: 'center'
  }
});

function Lists(props) {
  const [newListText, setNewListText] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const hideUsername = useMediaQuery({maxWidth: 650});
  const screenHeight = Dimensions.get('window').height;

  if (props.loading) {
    return (
      <View className="loading" style={{flex:1, alignItems:'center',justifyContent:'flex-end'}}>
        <Text> Hang tight...</Text>
      </View>
    );
  }

  const sortLabels = {
    created: {name: 'Creation Date', asc: 'Old → New', desc: 'New → Old'},
    name: {name: 'Name', desc: 'Z → A', asc: 'A → Z'},
  };
  let dropDownOptions = [];
  for (let field in sortLabels) {
    if (field !== 'order') {
      for (let direction of ['desc', 'asc']) {
        dropDownOptions.push({
          label: ` Sort by ${sortLabels[field].name}: ${sortLabels[field][direction]}`,
          value: `${field} ${direction}`,
        });
      }
    }
  }
  function generateLists(a, isOwner) {
    return (
      <View style={styles.list}>
        <Text
          style={styles.listName}
          onPress={() => {
            props.setSelectedListID(a.id);
            props.setSelectedListName(a.name);
          }}>
          {a.name}
        </Text>
        <View
          style={styles.shareDelete}>
          {isOwner && (
            <TouchableHighlight
              style={styles.share}
              onPress={() => {
                props.setShowShareScreenID(a.id);
                props.setShowShareScreenEmails(a.sharedWith);
              }}>
              <Image
                id="shareLists"
                source={share}
                style={{height: 20, width: 20}}
                alt="share list"
              />
            </TouchableHighlight>
          )}
          {isOwner && (
            <TouchableOpacity
              style={styles.deleteList}
              onPress={() => props.onListDeleted(a.id)}>
              <Text style={styles.buttonText}>x</Text>
            </TouchableOpacity>
          )}
          {!isOwner && (
            <TouchableOpacity
              style={styles.unshareList}
              className="listsButton"
              onPress={() => props.onListUnshared(a.id, props.user.email, false)}>
              <Text style={styles.buttonText}>Unshare with Me</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
  const yourLists = props.data.map(a => generateLists(a, true));
  const sharedLists = props.sharedData.map(a => generateLists(a, false));


  return (
    <SafeAreaView style={{flexGrow: 1, height: screenHeight}}>
      <View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>To-Do Lists</Text>
          <View id="usernameLogOut">
            <Text style={styles.username} onPress={() => setShowLogout(!showLogout)}>
              {!hideUsername && props.user.email}
              <Image
                source={dropdown}
                style={{height: 10, width: 10}}
                alt="dropdown"
              />
            </Text>

            {showLogout && !props.user.emailVerified && (
              <View style={styles.logIn}>
                <TouchableOpacity
                  style={styles.submit}
                  onPress={props.verifyEmail}>
                  <Text style={styles.buttonText}>Verify Email</Text>
                </TouchableOpacity>
              </View>
            )}
            {showLogout && (
              <View style={styles.logIn}>
                <TouchableOpacity
                  style={styles.logOut}
                  onPress={() => props.auth.signOut()}
                >
                  <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.newListComponents}>
          <TouchableOpacity
            style={newListText ? styles.addListEnabled : styles.addListDisabled}
            className={`listsButton ${newListText ? 'enabled' : 'disabled'}`}
            onPress={e => {
              if (newListText !== '') {
                props.onListAdded(newListText);
                setNewListText('');
              }
            }}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={'Create New List...'}
            aria-label={`Create new List with name ${newListText}`}
            onChangeText={e => setNewListText(e)}
            value={newListText}
          />
        </View>
        {yourLists.length + sharedLists.length !== 0 && (
          <View style={styles.sortList}>
            <RNPickerSelect
              onValueChange={(value, index) => {
                props.onSortLists(value);
              }}
              placeholder={{}}
              items={dropDownOptions}
              value={`${props.sortListField} ${props.sortListDirection}`}
            />
          </View>
        )}
      </View>

      <ScrollView>
        <Text style={styles.subTitle}>Your Lists</Text>
        <View >{yourLists}</View>
        <Text style={styles.subTitle}>Lists Shared with You</Text>
        <View >{sharedLists}</View>
      </ScrollView>
      {props.showShareScreenID !== null && (
        <ShareScreen
          onListShared={props.onListShared}
          showShareScreenID={props.showShareScreenID}
          setShowShareScreenID={props.setShowShareScreenID}
          showShareScreenEmails={props.showShareScreenEmails}
          onListUnshared={props.onListUnshared}
          user={props.user}
        />
      )}
    </SafeAreaView>
  );
}
export default Lists;

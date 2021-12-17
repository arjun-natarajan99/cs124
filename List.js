import React, {useRef} from 'react';
import ListItem from './ListItem.js';
import {useState, useEffect} from 'react';
import ShareScreen from './ShareScreen.js';
import share from './share.png';
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  Switch,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles=StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: '900',
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: '#3E7FC6',
    width: 30,
    height: 30,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  controls: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  newTask: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  addTaskEnabled: {
    backgroundColor: '#3E7FC6',
    width: 60,
    height: 60,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  addTaskDisabled: {
    backgroundColor: '#27517f',
    width: 60,
    height: 60,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  priority: {
    borderWidth: 1,
    borderColor: 'darkgray',
    marginRight:10,
    marginLeft:10,
    borderRadius: 10,
    height: 60,
    width: 100,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    borderTopWidth: 1,
    height: 60,
    width: 150,
  },
  sortList: {
    borderWidth: 1,
    borderColor: 'darkgray',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
  },
  labels: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  delete: {
    backgroundColor: '#E14545',
    height: 30,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  completed: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});


function List(props) {
  const [hideCompletedItems, setHideCompletedItems] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemPriority, setNewItemPriority] = useState({
    key: 0,
    value: '---',
  });
  let listItems = props.data.map(a => (
    <ListItem
      id={a.id}
      item={a.item}
      checked={a.checked}
      onItemChanged={props.onItemChanged}
      key={a.id}
      created={a.created}
      priority={a.priority}
      onItemsDeleted={props.onItemsDeleted}
      {...a}
    />
  ));
  const incompleteListItems = listItems.filter(item => !item.props.checked);

  const sortLabels = {
    created: {name: 'Creation Date', desc: 'New → Old', asc: 'Old → New'},
    item: {name: 'Name', desc: 'Z → A', asc: 'A → Z'},
    priority: {name: 'Priority', desc: 'High → Low', asc: 'Low → High'},
  };
  let dropDownOptions = [];
  for (let field in sortLabels) {
    if (field !== 'order') {
      for (let direction of ['desc', 'asc']) {
        dropDownOptions.push({
          label: `Sort by ${sortLabels[field].name}: ${sortLabels[field][direction]}`,
          value: `${field} ${direction}`,
        });
      }
    }
  }
  function createWarning() {
    Alert.alert('Delete Completed Items?', 'This action is irreversible.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () =>
          props.onItemsDeleted(
            props.data.filter(item => item.checked).map(item => item.id),
          ),
        style: 'destructive',
      },
    ]);
  }

  return (
    <View
      style={{flexGrow: 1, height: Dimensions.get('window').height}}>
      <Modal animationType="slide"
             transparent={true}
             style={{flex:1}}
      >
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.controls}>
            <View style={{flex: 1, alignItems: "flex-start"}}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  props.setSelectedListID(' ');
                  props.setSelectedListName(' ');
                }}
                aria-label="Back button to see all lists">
                <Text style={styles.buttonText}>←</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 4, alignItems: "center"}}>
              <TextInput
                style={styles.title}
                value={props.selectedListName}
                onChangeText={e => props.onListNameChanged(props.id, e)}
                aria-label="Edit List Name"
                autoCorrect={false}
              />
            </View>
            <View style={{flex:1, alignItems: "flex-end"}}>
              {props.showShareScreenEmails && (
                <TouchableHighlight
                  onPress={() => props.setShowShareScreenID(props.id)}>
                  <Image
                    source={share}
                    style={{height: 30, width: 30}}
                    alt="share list"
                    id="shareListsFromList"
                  />
                </TouchableHighlight>
              )}
            </View>
          </View>
          <View style={styles.newTask}>
            <TouchableOpacity
              style={newItemText ? styles.addTaskEnabled : styles.addTaskDisabled}
              onPress={e => {
                if (newItemText !== '') {
                  props.onItemAdded(newItemText, newItemPriority);
                  setNewItemText('');
                }
              }}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder={'Enter text here...'}
              onChangeText={e => setNewItemText(e)}
              onSubmitEditing={e => {
                if (newItemText !== '') {
                  props.onItemAdded(newItemText, newItemPriority);
                  setNewItemText('');
                }
              }}
              value={newItemText}
              autoCorrect={false}
              aria-label="Enter new list item"
            />
            <View style={styles.priority}>
              <RNPickerSelect

                onValueChange={(value, index) => {
                  setNewItemPriority(JSON.parse(value));
                }}
                placeholder={{
                  label: 'Select priority',
                  value: '{"key": "0", "value": "---"}',
                }}
                items={[
                  {label: 'High', value: '{"key": "c", "value": "High"}'},
                  {label: 'Medium', value: '{"key": "b", "value": "Medium"}'},
                  {label: 'Low', value: '{"key": "a", "value": "Low"}'},
                ]}
              />
            </View>
          </View>

          {listItems.length !== 0 && (
            <View style={styles.sortList}>
              <RNPickerSelect
                onValueChange={(value, index) => {
                  props.onSortItems(value);
                }}
                placeholder={{}}
                items={dropDownOptions}
                value={`${props.sortField} ${props.sortDirection}`}
              />
            </View>
          )}

          <ScrollView>
            {listItems.length !== 0 && (
              <View style={styles.labels}>
                <Text style={styles.subTitle}>Item</Text>
                <Text style={styles.subTitle}>Priority</Text>
              </View>
            )}
            {hideCompletedItems ? incompleteListItems : listItems}
          </ScrollView>
          <View style={styles.completed}>
            {incompleteListItems.length !== listItems.length && (
              <View id="hideCompletedItems">
                <Text>Hide Completed Items</Text>
                <Switch
                  onValueChange={() => setHideCompletedItems(!hideCompletedItems)}
                  value={hideCompletedItems}
                />
              </View>
            )}
            {incompleteListItems.length !== listItems.length &&
              !hideCompletedItems && (
                <TouchableOpacity
                  style={styles.delete}
                  onPress={createWarning}>
                  <Text style={styles.buttonText}>Delete Completed Items</Text>
                </TouchableOpacity>
              )}
          </View>
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
      </Modal>
    </View>
  );
}
export default List;

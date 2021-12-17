import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  deleteItem: {
    backgroundColor: '#E14545',
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
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  task: {
    flex: 5,
    justifyContent: 'center',
  },
});

function ListItem(props) {
  let items = [
    {value: '{"key": "c", "value": "High"}', label: 'High'},
    {value: '{"key": "b", "value": "Medium"}', label: 'Medium'},
    {value: '{"key": "a", "value": "Low"}', label: 'Low'},
    {value: '{"key": "0", "value": "---"}', label: '---'},
  ];
  let item = (
    <View style={styles.listItem}>
      <View style={{flex: 1}}>
        <BouncyCheckbox
          id={props.id}
          isChecked={props.checked}
          onPress={() => props.onItemChanged(props.id, 'checked', !props.checked)}
          aria-label={
            props.checked
              ? `Unmark ${props.item} as completed.`
              : `Mark ${props.item} as completed.`
          }
        />
      </View>
      <View style={styles.task}>
        <TextInput
          id={props.id}
          className={props.className}
          value={props.item}
          autoCorrect={false}
          multiline={true}
          onChangeText={e => props.onItemChanged(props.id, 'item', e)}
          onPress={() => props.onItemChanged(props.id, 'checked', !props.checked)}
        />
      </View>
      <View style={{flex: 2, justifyContent: 'center', marginLeft: 20}}>
        <RNPickerSelect
          onValueChange={e =>
            props.onItemChanged(props.id, 'priority', JSON.parse(e))
          }
          placeholder={{}}
          items={items}
          value={
            items.filter(
              item => JSON.parse(item.value).key == props.priority.key,
            )[0].value
          }
        />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.deleteItem}
          onPress={() => props.onItemsDeleted([props.id])}
          aria-label={`Delete ${props.item}`}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View key={props.id} id="listItem">
      {item}
    </View>
  );
}
export default ListItem;

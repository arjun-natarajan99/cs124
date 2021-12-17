import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  shareUser: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  addUserEnabled: {
    backgroundColor: '#3E7FC6',
    width: 30,
    height: 30,
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  addUserDisabled: {
    backgroundColor: '#27517f',
    width: 30,
    height: 30,
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
  share: {
    backgroundColor: '#3E7FC6',
    height: 30,
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  cancel: {
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
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    borderTopWidth: 1,
    height: 30,
    width: Dimensions.get("window").width/2,
  },
  note: {
    fontSize: 13,
    color: "darkgray",
    paddingBottom: 20,
  },
  disclaimer: {
    fontSize: 10,
    color: "#E14545",
    paddingBottom: 20,
  },
  shareWith: {
    flex: 1,
    justifyContent: "space-around"
  }
});

function ShareScreen(props) {
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [showShareWithSelfError, setShowShareWithSelfError] = useState(false);
  const [showShareWithValidError, setShowShareWithValidError] = useState(false);
  const [showShareWithDuplicateError, setShowShareWithDuplicateError] =
    useState(false);
  function checkValidInput() {
    if (
      currentEmail !== '' &&
      currentEmail !== props.user.email &&
      !props.showShareScreenEmails.includes(currentEmail) &&
      !emails.includes(currentEmail) &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        currentEmail,
      )
    ) {
      setEmails([...emails, currentEmail]);
      setCurrentEmail('');
      setShowShareWithValidError(false);
      setShowShareWithSelfError(false);
      setShowShareWithDuplicateError(false);
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        currentEmail,
      )
    ) {
      setShowShareWithValidError(true);
      setShowShareWithSelfError(false);
      setShowShareWithDuplicateError(false);
    }
    if (currentEmail === props.user.email) {
      setShowShareWithSelfError(true);
      setShowShareWithValidError(false);
      setShowShareWithDuplicateError(false);
    }
    if (
      props.showShareScreenEmails.includes(currentEmail) ||
      emails.includes(currentEmail)
    ) {
      setShowShareWithDuplicateError(true);
      setShowShareWithValidError(false);
      setShowShareWithSelfError(false);
    }
  }
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
  const renderItemToShare = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => setEmails(emails.filter(e => e !== item))}
      />
    );
  };
  const renderItemAlreadyShared = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() =>
          props.onListUnshared(props.showShareScreenID, item, true)
        }
      />
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide"
             transparent={true}
             style={{flex:1}}
      >
        <View style={styles.centeredView}>
          <View
            style={styles.modalView}>
            <Text style={styles.subTitle}>
              Who would you like to share this list with? Enter their emails below:
            </Text>
            <View style={styles.shareUser}>
              <TouchableOpacity
                style={currentEmail ? styles.addUserEnabled : styles.addUserDisabled}
                onPress={checkValidInput}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TextInput
                required
                style={styles.input}
                placeholder={'Enter email here...'}
                onChangeText={e => setCurrentEmail(e)}
                onSubmitEditing={checkValidInput}
                value={currentEmail}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
            </View>
            {showShareWithSelfError && (
              <Text style={styles.disclaimer}>
                You cannot share a list with yourself.
              </Text>
            )}
            {showShareWithDuplicateError && (
              <Text style={styles.disclaimer}>
                This list is already shared with this user.
              </Text>
            )}
            {showShareWithValidError && (
              <Text style={styles.disclaimer}>
                You must enter a valid email.
              </Text>
            )}

            <Text style={styles.note}>
              Note that these users will only be able to access a shared list once
              they have verified their account.
            </Text>

            <View style={styles.shareWith}>
              <View>
                <Text style={styles.subTitle}> Share With:</Text>
                <FlatList
                  data={emails}
                  renderItem={renderItemToShare}
                  style={{height: Dimensions.get('window').height / 6}}
                />
              </View>
              <View id="alreadyShared">
                <Text style={styles.subTitle}> Already Shared With:</Text>
                <FlatList
                  data={props.showShareScreenEmails}
                  renderItem={renderItemAlreadyShared}
                  style={{height: Dimensions.get('window').height / 6}}
                />
              </View>


              <View id="buttons">
                {emails.length !== 0 && (
                  <TouchableOpacity
                    style={styles.share}
                    onPress={() => {
                      props.onListShared(props.showShareScreenID, emails);
                      props.setShowShareScreenID(null);
                    }}>
                    <Text style={styles.buttonText}>Share</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.cancel}
                  onPress={() => props.setShowShareScreenID(null)}
                  aria-label={'Cancel sharing.'}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default ShareScreen;

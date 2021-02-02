import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet ,Alert} from 'react-native'
import { connect } from 'react-redux';
import { Credential } from '../actions';
import firestore from '@react-native-firebase/firestore';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import EditorMenu from './EditorMenu';
import Spinner from './common/Spinner';
import { Colors } from './Constants';
import JournMenu from './JournMenu';

interface Cred {
  prop: string
  value: string
}

interface Props {
  firstName: string
  lastName: string
  Editor: boolean
  Credential: (details: Cred) => void
  EditUserInfo: (
    uid: number,
    firstName: string,
    lastName: string,
    Editor: boolean,
  ) => void
  user: any
  navigation: DrawerNavigationProp<any, any>
  editLoading: boolean
  errorMessage: string
  signMeOut: () => void;
}

const Name: React.FC<Props> = props => {

  const [navigated, setNavigated] = useState(null);

  const {
    Credential,
    user,
  } = props

  useEffect(() => {
    //to find out the user type and navigate them accordingly
    if (user) {
      let id = user.user.uid
      firestore()
        .collection('Info')
        .doc(id.toString())
        .get()
        .then(doc => {
          if (doc.data() != undefined) {
            Credential({ prop: 'firstName', value: doc.data()?.firstName })
            Credential({ prop: 'lastName', value: doc.data()?.lastName })
            Credential({ prop: 'Editor', value: doc.data()?.Editor })
            setNavigated(doc.data()?.Editor);
          }
        })
        .catch(e => {
          Alert.alert('Error loading your information')
        })
    }
  }, [user])

  if (navigated == true) return <EditorMenu />
  else if (navigated == false) return <JournMenu />
  else {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: Colors.mainBackground,
        }}>
        <Spinner size={false} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = ({ SignInReducer }) => {
  return {
    user: SignInReducer.user,
    editLoading: SignInReducer.editLoading,
    errorMessage: SignInReducer.errorMessage,
  }
}


export default connect(mapStateToProps, { Credential })(Name);
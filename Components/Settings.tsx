import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Credential, signMeOut, EditUserInfo } from '../actions'
import Header from './common/Header'
import { TextInput } from 'react-native-paper'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, textInputTheme, GlobalStyles } from './Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from './common/Spinner'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const WIDTH = Dimensions.get('window').width

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

const Settings: React.FC<Props> = props => {
  const [loaded, setLoaded] = useState(true)
  const {
    firstName,
    lastName,
    Editor,
    Credential,
    user,
  } = props

  const validFormEdit = () => {
    if (!firstName || firstName.length < 2) {
      Alert.alert("First name can't be less than 2 chars long")
    } else if (!lastName || lastName.length < 2) {
      Alert.alert("Last name can't be less than 2 chars long")
    } else {
      let uid
      if (user) {
        uid = user.user.uid
        props.EditUserInfo(
          uid,
          firstName,
          lastName,
          Editor
        )
      }
    }
  }

  const showButton = () => {
    if (!props.editLoading) {
      return (
        <TouchableOpacity
          style={[GlobalStyles.buttonContainer, styles.logOut]}
          onPress={() => validFormEdit()}>
          <Text
            style={[GlobalStyles.buttonText, { color: Colors.mainBackground }]}>
            Save changes
          </Text>
          <Icon name={'account-edit'} size={25} color={Colors.mainBackground} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner size={true} spinnerColor={Colors.mainForeGround} />
        </View>
      )
    }
  }

  const functionsLogOut = () => {
    props.signMeOut()
    props.navigation.navigate('Home')
  }

  const showErrorMessage = () => {
    if (props.errorMessage) {
      return (
        <View style={{ height: 20 }}>
          <Text style={styles.textMissMatch}>{props.errorMessage}</Text>
        </View>
      )
    } else {
      return <View></View>
    }
  }

  const DrawerNavigationToggle = () => {
    props.navigation.toggleDrawer()
  }

  if (!loaded)
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
  else {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
        <Header HeaderText={'Settings'} HeaderStyle={{ backgroundColor: 'transparent' }}
          TextStyle={GlobalStyles.headerTextStyle} />
        <View style={styles.container}>
          <TextInput
            right={
              <TextInput.Icon name='account' color={Colors.mainForeGround} />
            }
            mode='outlined'
            multiline={false}
            style={GlobalStyles.textInputContainer}
            label='First name'
            value={firstName}
            onChangeText={text => Credential({ prop: 'firstName', value: text })}
            theme={textInputTheme}
          />
          <TextInput
            right={
              <TextInput.Icon name='account' color={Colors.mainForeGround} />
            }
            mode='outlined'
            multiline={false}
            style={GlobalStyles.textInputContainer}
            label='Last name'
            value={lastName}
            onChangeText={text => Credential({ prop: 'lastName', value: text })}
            theme={textInputTheme}
          />
          <Text style={GlobalStyles.headerTextStyle}>Your role: {Editor == true ? 'Editor' : 'Journalist'}</Text>
          {showButton()}
          <TouchableOpacity
            style={[GlobalStyles.buttonContainer, styles.logOut]}
            onPress={() => functionsLogOut()}>
            <Text
              style={[GlobalStyles.buttonText, { color: Colors.mainBackground }]}>
              Logout
            </Text>
            <Icon name={'logout'} size={25} color={Colors.mainBackground} />
          </TouchableOpacity>
          {showErrorMessage()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('5%'),
  },
  textMissMatch: {
    color: Colors.gray,
    fontSize: hp('12%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logOut: {
    flexDirection: 'row',
    width: WIDTH * 0.5,
    backgroundColor: Colors.mainForeGround,
  },
})

const mapStateToProps = ({ SignInReducer }) => {
  return {
    firstName: SignInReducer.firstName,
    lastName: SignInReducer.lastName,
    Editor: SignInReducer.Editor,
    user: SignInReducer.user,
    editLoading: SignInReducer.editLoading,
    errorMessage: SignInReducer.errorMessage,
  }
}

export default connect(mapStateToProps, { Credential, signMeOut, EditUserInfo })(
  Settings,
)

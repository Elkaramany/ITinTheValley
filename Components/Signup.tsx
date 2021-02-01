import React, { useState } from 'react'
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import { TextInput } from 'react-native-paper'
import _ from 'lodash'
import { Colors, textInputTheme, GlobalStyles } from './Constants'
import { Credential } from '../actions'
import HeaderArrow from './common/HeaderArrow'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Cred {
  prop: string
  value: string | boolean
}

interface Props {
  firstName: string
  lastName: string
  Editor: boolean,
  Credential: (details: Cred) => void
  navigation: StackNavigationProp<any, any>
}

const UserSignup: React.FC<Props> = props => {

  const { firstName, lastName, Editor, Credential } = props

  const validFormNavigation = () => {
    if (!firstName || firstName.length < 2) {
      Alert.alert("First name can't be less than 2 chars long")
    } else if (!lastName || lastName.length < 2) {
      Alert.alert("Last name can't be less than 2 chars long")
    } else {
      props.navigation.navigate('UserSignupFinal')
    }
  }

  const backToLogin = () => {
    props.navigation.goBack()
  }

  return (
    <ImageBackground
      source={require('../Images/Background.jpg')}
      style={styles.image}>
      <View style={GlobalStyles.headerContainer}>
        <HeaderArrow
          HeaderText={'Sign up (1 of 2)'}
          TextEdited={GlobalStyles.headerTextStyle}
          navigateMeBack={() => backToLogin()}
          iconName={'arrow-left'}
          iconColor={Colors.mainForeGround}
        />
      </View>
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
        <Text style ={styles.pickerStyle}>What to do you do at IT in the Valley?</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.pickerStyle, {backgroundColor: Editor == true ? Colors.mainForeGround : 'transparent'}]}
            onPress={() => Credential({prop: 'Editor', value: true})}
          >Editor</Text>
          <Text style={[styles.pickerStyle, {backgroundColor: Editor == false ? Colors.mainForeGround : 'transparent'}]}
            onPress={() => Credential({prop: 'Editor', value: false})}
          >Journalist</Text>
        </View>
        <TouchableOpacity
          style={[GlobalStyles.buttonContainer, { flexDirection: 'row' }]}
          onPress={() => validFormNavigation()}>
          <Text style={GlobalStyles.buttonText}>Sign up</Text>
          <Icon name={'account-plus'} size={30} color={Colors.mainBackground} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('100%'),
    height: hp('100%')
  },
  signUp: {
    color: Colors.mainHeader,
    fontSize: hp('12%'),
    margin: hp('5%'),
  },
  spinnerContainer: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('8%'),
    backgroundColor: 'transparent',
  },pickerStyle:{
    fontSize: hp('3%'),
    color: Colors.mainHeader,
    borderRadius: wp('20%'),
    padding: hp('1.4%'),
    marginHorizontal: wp('4%')
  }
})

const mapStateToProps = ({ SignInReducer }) => {
  return {
    firstName: SignInReducer.firstName,
    lastName: SignInReducer.lastName,
    Editor: SignInReducer.Editor,
  }
}

export default connect(mapStateToProps, { Credential })(UserSignup)

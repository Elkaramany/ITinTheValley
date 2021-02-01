import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const WIDTH: number = Dimensions.get('window').width;

const Colors = {
    mainBackground: '#fffff0',
    mainForeGround: '#216FD7',
    mainFooter: '#FFD700',
    gray: '#808080',
    brightRed: '#a35d6a',
    mainHeader: '#3b2e5a',
}

const GlobalStyles = StyleSheet.create({
    textInputContainer: {
        marginBottom: hp('3%'),
        width: '90%',
        borderRadius: wp('50%'),
    }, headerTextStyle: {
        color: Colors.mainForeGround,
        fontSize: hp('3%'),
        fontWeight: 'bold'
    },buttonContainer:{
        backgroundColor: Colors.mainForeGround,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('1.5%'),
        borderRadius: wp('3%'),
        margin: hp('2%'),
    },buttonText:{
        fontSize: hp('3%'),
        fontWeight: 'bold',
        color: Colors.mainBackground
    },textMissMatch: {
        color: Colors.gray,
        fontSize: hp('2%'),
        fontWeight: 'bold',
        textAlign: 'center'
    },headerContainer:{
        height: hp('20%')
    },regularText:{
        fontSize: hp('2.8%'),
        color: Colors.brightRed,
        marginHorizontal: wp('2%')
    }
})

const textInputTheme = {
    colors: {
        placeholder: Colors.mainForeGround, text: Colors.mainForeGround, primary: Colors.mainForeGround,
        underlineColor: Colors.mainForeGround, background: Colors.mainBackground
    }
}

export { Colors, textInputTheme, GlobalStyles };
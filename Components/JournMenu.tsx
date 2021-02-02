import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native'
import HeaderArrow from './common/HeaderArrow'
import { GlobalStyles, Colors, textInputTheme } from './Constants'
import { Credential } from '../actions'
import { connect } from 'react-redux'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { TextInput, Switch } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Spinner from './common/Spinner';
import Header from './common/Header';
import ImgToBase64 from 'react-native-image-base64'
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';

interface Props {
    user: object | null | any
}

const Name: React.FC<Props> = props => {

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [articleLoad, setArticleLoad] = useState(false);

    const addArticleToDB =()=>{
        setArticleLoad(true);
        firestore().collection('Articles').add({
            description,
            image,
            approved: false,
            userID: props.user.user.uid
        }).then(() =>{
            setArticleLoad(false);
            Alert.alert("Article added successfully, It will appear in the approved section once an editor approves it")
        }).catch(() =>{
            setArticleLoad(false);
            Alert.alert("Error adding article")
        })
    }

    const renderFileData = () => {
        if (image) {
            return (
                <Image
                    source={{ uri: `data:image/jpeg;base64,${image}` }}
                    style={styles.images}
                />
            )
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../Images/default.jpg')}
                        style={styles.images}
                    />
                </View>
            )
        }
    }

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 0.5,
        });

        if (!result.cancelled) {
            ImgToBase64.getBase64String(result.uri)
                .then(base64String => setImage(base64String))
                .catch(err => console.error(err));
        } else {
            setImage('');
        }
    };

    const showButton = () => {
        if (articleLoad == true) {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner size={true} />
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => addArticleToDB()}
                    style={GlobalStyles.buttonContainer}>
                    <Text style={GlobalStyles.buttonText}>Add Article</Text>
                </TouchableOpacity>

            )
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
            <Header HeaderText={'Add an article'} HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={GlobalStyles.headerTextStyle} />
            <View style={styles.container}>
                <TextInput
                    right={
                        <TextInput.Icon
                            name={() => (
                                <MaterialIcons
                                    name='description'
                                    color={Colors.mainForeGround}
                                    size={25}
                                />
                            )}
                        />
                    }
                    mode='outlined'
                    multiline={true}
                    style={GlobalStyles.textInputContainer}
                    label='Article Description'
                    value={description}
                    onChangeText={text => setDescription(text)}
                    theme={textInputTheme}
                />
                <Text style={[GlobalStyles.regularText, {marginBottom: 10}]}>You can also add an image to be attached with your article: </Text>
                <View>{renderFileData()}</View>
                <TouchableOpacity
                    onPress={() => chooseImage()}
                    style={GlobalStyles.buttonContainer}>
                    <Text style={GlobalStyles.buttonText}>Choose Image</Text>
                </TouchableOpacity>
                <View>{showButton()}</View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    images: {
        width: wp('55%'),
        height: hp('25%'),
        borderRadius: wp('5%')
    }, spinnerContainer: {
        height: hp('2.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp('5%'),
    },
})

const mapStateToProps = ({ SignInReducer }) => {
    return {
        user: SignInReducer.user,
    }
}

export default connect(mapStateToProps, {})(Name);
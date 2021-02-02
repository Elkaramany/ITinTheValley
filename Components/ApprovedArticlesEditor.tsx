import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchAllArticles, changeArticleApproval } from '../actions';
import { Colors, GlobalStyles } from './Constants';
import Spinner from './common/Spinner';
import Header from './common/Header';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

interface signleArticle {
    approved: boolean,
    description: string,
    image: string,
    userID: number
}

interface Props {
    fetchAllArticles: () => void;
    changeArticleApproval: (item) => void;
    allArticles: signleArticle[],
    errorMessage: string,
    articlesLoading: boolean,
    headerTitle: string,
    articleApproval: boolean,
    articleApproveLoading: boolean,
}

const ApprovedArticlesEditor: React.FC<Props> = props => {

    useEffect(() => {
        props.fetchAllArticles();
    }, [])

    const showErrorMessage = () => {
        if (props.errorMessage !== '') {
            <View style={{ height: 20 }}>
                <Text style={GlobalStyles.textMissMatch}>
                    {props.errorMessage}
                </Text>
            </View>
        } else {
            return <View></View>
        }
    }

    const hasPicture = (picture) => {
        if (picture && picture.length > 63) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${picture}` }}
                        style={styles.images}
                    />
                </View>
            )
        } else {
            return <Text style={styles.noImageStyle}>No image available for this article</Text>
        }
    }

    const showApproveButton = (item) => {
        if (props.headerTitle === 'All non-approved Articles') {
            if(!props.articleApproveLoading){
                return (
                    <TouchableOpacity style={GlobalStyles.buttonContainer}
                        onPress={() => props.changeArticleApproval(item)}
                    >
                        <Text style={GlobalStyles.buttonText}>Approve Article</Text>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <View style={styles.spinnerContainer}>
                        <Spinner size={true} />
                    </View>
                )
            }
        }
    }

    const renderItem = ({ item }) => {
        if (item.data().approved == props.articleApproval) {
            return (
                <View style={{ marginHorizontal: wp('5%'), marginVertical: hp('2%'), flex: 1 }}>
                    {hasPicture(item.data().image)}
                    <Text style={[styles.descStyle, { color: 'tomato' }]}>
                        Article Description:
                        </Text>
                    <Text style={styles.descStyle}> {item.data().description}</Text>
                    {showApproveButton(item)}
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: hp('0.15%') }} />
                </View>
            )
        }
    }

    if (props.articlesLoading == true) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.mainBackground }}>
                <Spinner size={false} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Header HeaderText={props.headerTitle} HeaderStyle={{ backgroundColor: 'transparent' }}
                    TextStyle={GlobalStyles.headerTextStyle} />
                <FlatList
                    data={props.allArticles}
                    renderItem={renderItem}
                    keyExtractor={article => article.image}
                />
                {showErrorMessage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBackground
    }, images: {
        width: wp('60%'),
        height: hp('30%'),
        marginBottom: hp('2%'),
        borderRadius: wp('5%')
    }, noImageStyle: {
        fontSize: wp('4%'),
        color: 'tomato',
        marginVertical: hp('0.5%'),
    }, descStyle: {
        fontSize: hp('2.5%'),
        color: Colors.mainHeader,
        marginVertical: hp('0.5%'),
        textAlign: 'center',
    },spinnerContainer: {
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp('5%'),
    },
})

const mapStateToProps = ({ ArticlesReducer }) => {
    return {
        allArticles: ArticlesReducer.allArticles,
        errorMessage: ArticlesReducer.errorMessage,
        articlesLoading: ArticlesReducer.articlesLoading,
        articleApproveLoading: ArticlesReducer.articleApproveLoading,
    }
}

export default connect(mapStateToProps, { fetchAllArticles, changeArticleApproval })(ApprovedArticlesEditor);
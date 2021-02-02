import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';


export const fetchAllArticles = () => {
    return (dispatch) => {
        dispatch({ type: 'fetch_articles_begin' });
        firestore().collection('Articles').get()
            .then(doc => {
                dispatch({ type: 'fetch_articles_success', payload: doc.docs })
            })
            .catch(e => {
                Alert.alert('Error loading Articles')
                console.log(e);
                dispatch({ type: 'fetch_articles_fail' })
            })
    }
}

export const changeArticleApproval = (item) => {
    return (dispatch) => {
        dispatch({ type: 'approve_article_begin' });
        firestore().collection('Articles').doc(item.id).set({
            description: item.data().description,
            image: item.data().image,
            approved: !item.data().approved,
            userID: item.data().userID,
        }).then(() => {
            Alert.alert('Article Approved')
            dispatch({ type: 'approve_article_success' })
        }).catch(e => {
                Alert.alert('Error Approving Article')
                console.log(e);
                dispatch({ type: 'approve_article_fail' })
            })
    }
}
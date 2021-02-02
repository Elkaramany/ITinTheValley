interface signleArticle{
    approved: boolean,
    description: string,
    image: string,
    userID: number
}

interface Props{
    allArticles: signleArticle[],
    errorMessage: string,
    articlesLoading: boolean,
    articleApproveLoading: boolean,
}

const INITIAL_STATE:Props ={
    allArticles: [],
    errorMessage: '',
    articlesLoading: false,
    articleApproveLoading: false
}

export default (state = {INITIAL_STATE}, action) => {
    switch(action.type){
        case 'fetch_articles_success':
            return{...state, ...INITIAL_STATE, allArticles: action.payload};
            break;
        case 'fetch_articles_fail':
            return{...state, ...INITIAL_STATE, errorMessage: 'Failed to retrieve articles from the database'};
            break;
        case 'fetch_articles_begin':
            return{...state, articlesLoading: true};
            break;
        case 'approve_article_success' || 'approve_article_fail':
            return{...state, articleApproveLoading: false}
            break;
        case 'approve_article_begin':
            return{...state, articleApproveLoading: true}
            break;
        case 'sign_me_out_success':
            return{...state, ...INITIAL_STATE}
            break;
        default:
            return state;
    }
}
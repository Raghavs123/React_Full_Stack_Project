import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useState, useEffect } from "react";
import axios from 'axios';
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";


const ArticlePage = () => {
    // const params = useParams();
    // const { articleId } = params;

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();  // articleId is the key in params object (Extracting URL Parameters)

    useEffect(() => {

        const loadArticleInfo = async () => {
            // Since, "proxy": "http://localhost:8000/" is set in Frontend package.json()
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = await response.data;
            
            setArticleInfo(newArticleInfo);    // actual data from server 
            // setArticleInfo({upvotes: Math.floor(Math.random() * 10 + 1), comments: []});  // fake data            
        }

        loadArticleInfo();
    }, []);

    const article = articles.find(article => article.name === articleId);  // searching for article name in articles from articleId i.e URL Parameter    

    // Function to increase the upvote count in actual data in db on clicking on upvote button
    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    // when user enters wrong article name or when the article name doesn't exists
    // then NotFoundPage is displayed
    // if(!article){
    //     return <NotFoundPage />
    // }

    if(!articleInfo){
        return <NotFoundPage />
    }

    return (
        <>
        {/* <h1>{article.title}</h1>  */}
        <h1>{articleInfo.title}</h1>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
        <button onClick={addUpvote}>Upvote</button>
        {/* {article.content.map((paragraph,i) => (<p key={i}>{paragraph}</p>))} */}
        <br />
        <p>{articleInfo.content}</p>

        {/* Syncing ArticleInfo in ArticlePage with response from AddCommentForm */}
        <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
        <CommentsList comments={articleInfo.comments} />
        </>

        // <h1>This is Article Page of id : {articleId}</h1>
    );
}

export default ArticlePage;
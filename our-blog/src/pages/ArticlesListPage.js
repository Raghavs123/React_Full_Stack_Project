import articles from "./article-content";
import ArticlesList from "../components/ArticlesList";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import AddArticleForm from "../components/AddArticleForm";

const ArticlesListPage = () => {
    let [allArticles, setAllArticles] = useState([]);

    useEffect(() => {

        const loadAllArticles = async () => {
            const response = await axios.get(`/api/allarticles`);
            const allArticlesInfo = await response.data;

            setAllArticles(allArticlesInfo);
        }
        
        loadAllArticles();
    }, []);

    return (
        <>        
        <h1>Articles</h1>
        {/* {allArticles} */}
        <ArticlesList articles={allArticles} />
        
        <div className="add-article-btn">
            <Link to="/addarticle" onAllUpdatedArticles={updatedAllArticles => setAllArticles(updatedAllArticles)}>
                <button>Add a new Article</button>
            </Link>
        </div>
        {/* <AddArticleForm onAllUpdatedArticles={updatedAllArticles => setAllArticles(updatedAllArticles)} /> */}
        </>

        // <h1>This is Articles List Page.</h1>
    );
}

export default ArticlesListPage;
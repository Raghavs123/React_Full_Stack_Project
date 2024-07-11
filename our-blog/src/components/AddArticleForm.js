import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddArticleForm = ({onAllUpdatedArticles}) => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const addArticle = async () => {
        const response = await axios.post(`/api/articles`, {
            name: name,
            title: title,
            content: content,
            upvotes: 0,
            comments: []
        })

        const updatedArticle = response.data;
        onAllUpdatedArticles(updatedArticle);
        setName("");
        setTitle("");
        setContent("");
        navigate("/articles");
    }

    return (
        <>
        <div id="add-article-form">
            <h1>New Article Form</h1>
            <b>Name :</b> <input placeholder="Add name for your article" value={name} onChange={e => setName(e.target.value)} />
            <b>Title :</b> <input placeholder="Add title for your article" value={title} onChange={e => setTitle(e.target.value)} />  
            <b>Content :</b><textarea rows="5" placeholder="Add content for your article" value={content} onChange={e => setContent(e.target.value)} />
            <button onClick={addArticle}>Add article</button>
        </div>
        </>
    )
}

export default AddArticleForm;
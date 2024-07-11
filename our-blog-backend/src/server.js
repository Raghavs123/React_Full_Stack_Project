import express from 'express';
import mongoose from 'mongoose'; 
import Article from '../model/articlesModel.js';
import fs from "fs";
import admin from "firebase-admin";
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adding Firebase Admin to Backend
// Operation that needs to be done before starting our server
const credentials = JSON.parse(
    fs.readFileSync("../credentials.json")   // Loading our credentials file synchronously
)

// Using above loading to initialize the firebase-admin package on our server and connect it to our firebase project
admin.initializeApp({
    credential: admin.credential.cert(credentials)  // configuration object
})

// The above steps is just we are telling the firebase admin package what credentials to use in order to connect to our project

const app = express();

app.use(express.json());   // parsing data from req.body
app.use(express.static(path.join(__dirname,"../build")));

app.get(/^(?!\/api).+/, (req,res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

// MongoDB connecting to Express Logic
main()
.then(() => console.log("connection successful") )
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/react-blog-db');
// await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qglepun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
}

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// app.get("/hello", (req,res) => {
//     res.send(`Hello! ${req.body.name}`);
//     console.log(req.body.name);
// });

// app.get("/hello/:name", (req,res) => {
//     let { name } = req.params;
//     console.log(req.params);
//     res.send("sent");
// });

// Article data to be initialized in MongoDB
// let articlesInfo = [
//   { name: "learn-react", upvotes: 0, comments: [] },
//   { name: "learn-node", upvotes: 0, comments: [] },
//   { name: "mongodb", upvotes: 0, comments: [] },
// ];

// let article1 = new Article({
//     name: "learn-expressss",
//     upvotes: 0,
//     comment: "This is an express tutorial"
// });
// article1.save().then(res => console.log(res));


// Increase the upvote count for specific article
app.put("/api/articles/:name/upvote", async (req,res) =>{
    let { name } = req.params;
    // const article = articlesInfo.find((article) => article.name === name);

    // const article = await Article.find({name : `${name}`});
    const article = await Article.findOneAndUpdate({name : `${name}`}, { $inc: { upvotes: 1 } });
    const updatedArticle = await Article.findOne({name: `${name}`});

    if(updatedArticle){
        // article.upvotes += 1;
        // res.send(`the ${name} article now has ${updatedArticle.upvotes} upvotes !!!`);
        res.json(updatedArticle);
    }
    else{
        res.send(`That article doesn't exist`);
    }
});


// Add comments for specific article
app.post("/api/articles/:name/comments", async (req,res) => {
    let { name } = req.params;
    const { postedBy, text } = req.body;

    // const article = articlesInfo.find((article) => article.name === name);

    const article = await Article.findOneAndUpdate({name : `${name}`}, { $push : { comments: { postedBy, text } }});
    const updatedArticle = await Article.findOne({name: `${name}`});

    if(updatedArticle){
        // article.comments.push({postedBy,text});
        // res.send(updatedArticle.comments);
        res.json(updatedArticle);
        // console.log(updatedArticle.comments);
    } else {
        res.send(`That article doesn't exist`);
    }
});


// Find the specific article
app.get("/api/articles/:name", async (req,res) => {
    const { name } = req.params;

    const article = await Article.findOne({name : `${name}`});

    if(article){
        // console.log(article);
        res.send(article);        
    } else {
        res.sendStatus(404).send("Article not found!");
    }
});

// display/find all articles
app.get("/api/allarticles", async (req,res) => {
    const allArticles = await Article.find({});
    // console.log(allArticles);
    // res.send("Hello");
    // res.send(allArticles);
    res.json(allArticles);
})

// create a new article
app.post("/api/articles", (req,res) => {
    // console.log(req.body);
    let { name, title, content, upvotes, comments } = req.body;

    let article = new Article({
        name: name,
        title: title,
        content: content,
        upvotes: upvotes,
        comments: comments
    });

    article.save().then(res => console.log("new article added")); 
});
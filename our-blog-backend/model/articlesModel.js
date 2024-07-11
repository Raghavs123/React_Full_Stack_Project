import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    name: String,
    title: String,
    content: String,
    upvotes: Number,
    comments: Schema.Types.Mixed
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
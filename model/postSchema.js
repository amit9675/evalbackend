const mongoose = require("mongoose") 
 const PostSchema = mongoose.Schema({
    "title": String,
    "body": String,
    "device": String,
    "no_of_comments": Number,
    "UserId":Number
 })
 const PostModel = mongoose.model("post",PostSchema)
module.exports = { PostModel}
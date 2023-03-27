const express = require("express");

var jwt = require("jsonwebtoken");
const { PostModel } = require("../model/postSchema");
const postRouter = express();
//This route is to post something after getting authenticated
postRouter.post("/add", async (req, res) => {
    console.log(req.body)
  try {
      const notes = new PostModel(req.body);
      await notes.save();
      res.send("Post has been added please check");
   
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
//This route is to get posts  after getting authenticated
postRouter.get("/", async (req, res) => {
  const token = req.headers.authorization
const decoded = jwt.verify(token,"shhhhh")
  try {
    if(decoded){
      console.log(decoded.userId)
    const note = await PostModel.find({"UserId":decoded.userId});
    console.log(note);
    res.send(note);
  }
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
postRouter.get("/top", async (req, res) => {
  const token = req.headers.authorization
const decoded = jwt.verify(token,"shhhhh")
  try {
    if(decoded){
      console.log(decoded.userId)
    const note = await PostModel.find({});
    console.log(note);
    res.send(note);
  }
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  const  id = req.params.id
  const data = req.body;
  console.log(data,id)
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, data);

    res.send(`Post has been updated`);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const  id = req.params.id
  console.log("id",id)
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send(`Post has been deleted`);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
module.exports = { postRouter };

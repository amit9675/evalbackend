const express = require("express");
const userRouter = express();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/userSchema");
// userRouter.get("/",(req,res)=>{
//   res.send("done")
// })
//Registeration Route
userRouter.post("/register", async (req, res) => {
  console.log(req.body)
  const { email, password, city, gender, age, name, is_married } = req.body;
  console.log(email);
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      const user = new UserModel({
        email,
        password: hash,
        city,
        gender,
        age,
        name,
        is_married,
      });
      await user.save();
      res.send(`Data added`);
    });
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
//Login Route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        var token = jwt.sign({ userId: user[0]._id }, "shhhhh");
        result
          ? res.send({ msg: "Logged in", token: token })
          : res.send({ msg: `Check the credentials` });
      });
    }
  } catch (error) {
    res.send({ msg: "error" });
  }
});
//Dummy check route
// userRouter.get("/", async (req, res) => {
//   const token = req.headers.authorization;
//   console.log(token);
//   try {
//     jwt.verify(token, "shhhhh", function (err, decoded) {
//       decoded
//         ? res.send(`Now you can access the data`)
//         : res.send({ msg: err.message });
//     });
//   } catch (error) {
//     res.send({ msg: error.messege });
//   }
// });
module.exports = { userRouter };
// {
//    "name": "Amit Bhandari",
//     "email": "a0423355@gamil.com",
//     "gender": "male",
//     "password": "123456",
//     "age": 25,
//     "city": "chelusain",
//     "is_married": true
// }
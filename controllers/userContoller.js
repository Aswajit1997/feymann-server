import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'

//creating function to generate json web token
const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:24*60*60*1000.
  })
}


const allUsers = async (req, res) => {
  let users = await User.find({});
  if (users) {
    res.status(200).json({
      status: "sucess",
      length: users.length,
      users,
    });
  } else {
    res.status(500);
    throw new Error("failed to load users");
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  //validation
  if (!username | !password) {
    res.status(400);
    throw new Error("Please fill in all required field");
  }
  if (password.length<5) {
    res.status(400);
    throw new Error("password must be greater than 5 characters");
  }
  //checking if user is already registered
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("username already been taken");
  }

  //create a newuser
  const newUser=await User.create({username,password})
  if(newUser){
    const token=createToken(newUser._id)
    res.cookie('jwt',token,{maxAge:1000*24*24,sameSite:"none"})
    res.status(201).json({
        status:"Success",
        userData:newUser._id,
    })
  }else {
    res.status(500)
    throw new Error("user creation failed try again")
  }

});

//login user
const loginUser=asyncHandler(async(req,res)=>{
  const {username,password}=req.body;
  //validation
  if (!username | !password) {
    res.status(400);
    throw new Error("Please fill in all required field");
  }
  if (password.length<5) {
    res.status(400);
    throw new Error("password must be greater than 5 characters");
  }
  //checking for user existance
  const user=await User.findOne({username})
  if(!user){
    res.status(500)
    throw new Error("user does't exists please login");
  }
  //password validation
  if(user.password===password){
    res.status(201).json({
      status:"Success",
      userData:user._id,
  })
  }
  else{
    res.status(500)
    throw new Error("incorrect password entered");
  }

})


const getUser=asyncHandler(async(req,res)=>{
  console.log(req.params)
  //checking  for user availability
  const userExist=await User.findById(req.params)
  if(!userExist){
    res.status(400)
    throw new Error("user doesn't exists plz register")
  }
  else{
    res.status(200).json({
      status:'success',
      user:userExist
    })
  }
})

export {getUser,registerUser,loginUser,allUsers}
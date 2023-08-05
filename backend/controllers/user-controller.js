import User from "../model/user";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let user;
  try {
    user = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "user is not Found" });
  }
  return res.status(200).json({ user }); //it means user=user es6 feature we can write like this it will give same output
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exist!!Instead of Login" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blog:[]
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};

export const login=async(req,res,next)=>{
    const {email,password}=req.body
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.send(404).json({message:"coudint find user By this Id"})
    }
  const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
  if(!isPasswordCorrect){
    return res.status(400).json({message:"Incorrect Password"})
  }
  return res.status(200).json({message:"Login Successfull"})
}

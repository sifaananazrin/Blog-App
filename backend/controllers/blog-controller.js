import mongoose from 'mongoose';
import Blog from "../model/blog";
import User from "../model/user";

export const getAllBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.find();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ blog });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable TO FInd User By This ID" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blog.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description, image } = req.body;
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      image,
    });

    if (!blog) {
      return res.status(500).json({ message: "Unable to Update" });
    }

    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occurred while updating" });
  }
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};


export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blog.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};
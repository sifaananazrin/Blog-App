import mongoose from "mongoose";
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type:mongoose.Types.ObjectId,
   ref:"User",
    required: true
  },
});

const Blog = mongoose.model("Blog", blogSchema); // Use mongoose.model to create a model from the schema.

export default Blog; // Export the model, not the Schema itself.

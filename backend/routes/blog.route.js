import express from "express"
import { getAllBlog,addBlog, updateBlog,getById,deleteBlog} from "../controllers/blog-controller"
const router=express.Router()

router.get("/",getAllBlog)
router.post("/add",addBlog)
router.put("/update/:id",updateBlog)
router.get("/:id",getById)
router.delete("/:id",deleteBlog)
export default router
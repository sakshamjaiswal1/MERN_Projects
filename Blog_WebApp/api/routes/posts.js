const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");



// create Post 
router.put("/", async (req, res) => {
 const newPost = new Post(req.body)
 try{
   const savedPost = await newPost.save()
  res.status(200).json(savedPost)
 }
 catch(err){
   res.status(500).json(err)
 }
});

// Update Post 
router.delete("/:id", async (req, res) => {
  
  
});

// delete post 
    router.get('/:id',async (req,res)=>{
     
    })


module.exports = router;

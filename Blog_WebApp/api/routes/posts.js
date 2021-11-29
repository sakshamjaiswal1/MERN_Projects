const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");



// create Post 
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try{
const post = await Post.findById(req.params.id)
if(post.username===req.body.username){
try{
const updatePost = await Post.findByIdAndUpdate(req.params.id,{
  $set:req.body,
},{new:true})
res.status(200).json(updatePost)
}

catch(err){
  res.status(500).res.json(500)
}
}
else{
  res.status(200).json("You can update your post only")
}
  }
  catch(err){
    res.status(500).json(err)
  }
  
});

// delete post 
    router.delete('/:id',async (req,res)=>{
      try{
        const post = await Post.findById(req.params.id)
        if(post.username===req.body.username){
        try{
        const deletePost = await post.delete()
        res.status(200).json("Post has been deleted")
        }
        
        catch(err){
          res.status(500).res.json(500)
        }
        }
        else{
          res.status(200).json("You can delete your post only")
        }
          }
          catch(err){
            res.status(500).json(err)
          }  
    })

// get post 
router.get('/:id',async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  }
  catch(err){
    res.status(500).json(err)
  }
}) 

// Get all post 
router.get('/',async (req,res)=>{
  try{
  const username = req.query.user
    const catName= 
  }
  catch(err){
    res.status(500).json(err)
  }
}) 


module.exports = router;

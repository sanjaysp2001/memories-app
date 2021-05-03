const postModel = require('../models/posts');

const getPosts = async (req,res)=>{
     //res.send("This is the posts page");
     try{
         const postMessages = await postModel.find();
         res.status(200);
         res.json(postMessages)
     }catch(error){
         res.status('404').json({message:error.message});
     }
}

const createPost = async (req,res)=>{
    //res.send('Post created');
    const body = req.body;
    const newPost = new postModel(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status('409').json({message:error.message});
    }

}

const updatePost = async(req,res)=>{
    const {id:_id} = req.params;
    const postData = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send('No post with that id!');
    const updatedPost = await postMessages.findByIdAndUpdate(_id,postData,{new:true});
    res.json(updatedPost);

}

module.exports={
    getPosts,
    createPost,
    updatePost,
}
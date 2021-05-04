const mongoose = require('mongoose');
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
    const {id: _id} = req.params;
    const postData = req.body; 
    
    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send('No post with that id!');

    const updatedPost = await postModel.findByIdAndUpdate(_id,{ ...post, _id },{new:true});

    res.json(updatedPost);

}

const deletePost = async(req,res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No post with that id!');

    await postModel.findByIdAndRemove(id);
    //console.log('DELETE');
    res.json('Post deleted Successfully!');
}

const likePost = async(req,res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No post with that id!');
    const post = await postModel.findById(id);
    const updatedPost = await postModel.findByIdAndUpdate(id,{likeCount : post.likeCount + 1},{new:true})
    res.json('Updated Post!');

}

module.exports={
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post');
const app = express();

app.use(bodyParser.json({limit:'30mb',extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended: true}));
app.use(cors());
 

//-----------------------mongodb configuration starts------------
const CONNECTION_URL = 'mongodb+srv://spsanjay:memoriesapp2001@memories.1dvwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT||5000;
mongoose.set('useFindAndModify',false);
mongoose.connect(CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{//this connect returns a promise
        app.listen(PORT,()=> console.log(`Server running on PORT:${PORT}`))})
    .catch((error)=>{
        console.log(error);
    });

//-----------------------mongodb configuration ends-------------
app.get('/',(req,res)=>{
    res.send("This is home page!");
})
app.use('/posts',postRoutes);
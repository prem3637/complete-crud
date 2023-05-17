const express = require('express');
const multer = require('multer');
const cors = require('cors');
const PORT = process.env.PORT || '8000'
const app = express();
require('./db/config');
const productSchema=require('./db/product')
const Category = require('./db/category');
const userSchema=require('./db/user')
app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(cors())


const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"./../client/public/uploads")
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+".jpg")
        }
    })
}).single("product_image");


app.post('/user',async(req,res)=>{
    let user = new User(req.body)
    let result = await user.save()
    result = await result.toObject()
    res.send(result)
})
 
app.get('/data',async(req,res)=>{
    let result= await productSchema.find();
    res.send(result);
})
app.post('/uploads',upload,async(req,res)=>{
      const data1 ={
        ...req.body,
        "product_image" : req.file.filename
      }
      let product = new productSchema(data1);
    let result = await product.save();
    result = result.toObject()
        res.send(result);
})
 
app.delete('/uploads/:id',async(req,res)=>{
    let result = await productSchema.deleteOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        console.log({result:"NO Data Found"})
    }
})
app.get('/uploads/:id',async(req,res)=>{
    let result = await productSchema.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        console.log({result:"NO Data Found"})
    }
})

app.put('/uploads/:id',async(req,res)=>{
    let result = await productSchema.updateOne({_id:req.params.id},{$set:req.body})
    res.send(result)
})


//Category Crud
app.post('/add_category',async(req,res)=>{
    let category = new Category(req.body)
    let result = await category.save()
    result = await result.toObject()
    res.send(result)
})
app.get('/show_category',async(req,res)=>{
    let result = await Category.find().select('-password')
    res.send(result)
})
app.delete('/show_category/:id',async(req,res)=>{
    let result = await Category.deleteOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        console.log({result:"NO Data Found"})
    }
})
app.get('/show_category/:id',async(req,res)=>{
    let result = await Category.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        console.log({result:"NO Data Found"})
    }
})

app.put('/show_category/:id',async(req,res)=>{
    let result = await Category.updateOne({_id:req.params.id},{$set:req.body})
    res.send(result)
})
 //register
 app.post('/register',async(req,res)=>{
    let user = new userSchema(req.body)
    let result = await user.save()
    result = await result.toObject()
    res.send(result)
})
app.post('/login',async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await userSchema.findOne({
          email: email,
          password: password,
        });
        if (usermail) {
          res.status(200).json({
            code: 200,
            message: "user Login successfully",
            data: {
             _id: usermail._id,
             // name: usermail.name,
             email: usermail.email,
             // contact: usermail.contact,
            },
            error: false,
            status: true,
          });
          console.log(usermail._id);
        } else {
          res.status(404).json({
            code: 404,
            message: "Invalid User details, Try Again.  ",
            data: [],
            error: false,
            status: false,
          });
        }
      } catch (err) {
        console.log(err);
      }
})

app.listen(PORT, (req,res)=>{
    console.log('server started')
})
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongose=require("mongoose");

mongose.connect("mongodb+srv://Amish32216:Aks_32216@cluster0.tp1su.mongodb.net/blogWebsite",{useNewUrlParser:true})

const itemSchema={
  title:String,
  body:String  
};

const Item=new mongose.model("item",itemSchema);

const homeStartingContent = "Welcome to DAILY JOURNAL. You can use this website to post your Blogs on different subject matter. For any changes or inconvenience feel free to contact. Happy Blogging.";

const app = express();

const posts=[];
let contacts=[];
let year=new Date().getFullYear();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  Item.find({},(err,listItems)=>{
    res.render("home",{year:year,homeContent:homeStartingContent,listItems:listItems});
  })
})

app.get("/about",(req,res)=>{
  res.render("about",{year:year});
  
})

app.get("/contact",(req,res)=>{
  res.render("contact",{year:year});
})

app.get("/compose",(req,res)=>{
  res.render("compose",{year:year});
})

// app.get("/post",(req,res)=>{
//   res.render("post",{year:year,element})
// })


app.post("/compose",(req,res)=>{
  let post={
    title:req.body.journalTitle,
    post:req.body.journalPost
  };
  const item=new Item({
    title:post.title,
    body:post.post
  });
  item.save();
  res.redirect("/");
})

app.get("/post/:userPost",(req,res)=>{
  let title=req.params.userPost;
  Item.findById(title,(err,listItem)=>{
    if(err)
      console.log(err);
    else
      res.render("post",{year:year,element:listItem})
  })
})

app.post("/delete",(req,res)=>{
  const toBeDeletedItemId=req.body.button;
  Item.findOneAndRemove(toBeDeletedItemId,(err,docs)=>{
    if(err)
        console.log(err);
  });
  res.redirect("/");
})

app.post("/contact",(req,res)=>{
  const name=req.body.name;
  const mail=req.body.email;
  const suggestion=req.body.suggestion;
  let contact={fname:name,email:mail,sug:suggestion};
  contacts.push(contact);
  console.log(name+" "+mail+" "+suggestion);
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

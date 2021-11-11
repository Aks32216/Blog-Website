//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts=[];
let year=new Date().getFullYear();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.render("home",{year:year,homeContent:homeStartingContent,posts:posts});
  
})

app.get("/about",(req,res)=>{
  res.render("about",{year:year,aboutContent:aboutStartingContent});
  
})

app.get("/contact",(req,res)=>{
  res.render("contact",{year:year,contactContent:contactStartingContent});
})

app.get("/compose",(req,res)=>{
  res.render("compose",{year:year});
})


app.post("/compose",(req,res)=>{
  let post={
    title:req.body.journalTitle,
    post:req.body.journalPost
  };
  posts.push(post);
  res.redirect("/");
})

app.get("/post/:userPost",(req,res)=>{
  let title=req.params.userPost;
  title.toLowerCase();
  console.log(title);
  for(let i=0;i<posts.length;++i)
  {
    let postsTitle=posts[i].title;
    postsTitle.toLowerCase();
    console.log(postsTitle);
    if(postsTitle===title){
      console.log("Match Found");
      return;
    }
  }
  console.log("Match not Found");

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

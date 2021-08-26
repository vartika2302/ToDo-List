const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname+"/date.js");
const ejsLint = require("ejs-lint");

const items = ["Attend classes","Go to cafetaria","Learn some new tech"];
const workItems = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//To set our app's view engine to ejs
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    let day = date();
    res.render("list",{listTitle:day,newListItems: items});
});

app.post("/",(req,res)=>{
    let item = req.body.listItem;
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work",(req,res)=>{
    res.render("list",{listTitle: "Work List",newListItems: workItems});
})

app.post("/work",(req,res)=>{
    let workItem = req.body.listItem;
    workItems.push(workItem);
    res.redirect("/work");
})

app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
});
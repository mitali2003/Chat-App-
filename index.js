const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require("method-override");

const path = require('path');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().then(()=>{console.log("connection sucessfully")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/watsupp');
}

// let chat1 = new Chat({
//     from:"kaushik",
//     to:"mitali",
//     message:"hey! how are you?",
//     created_at: new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(res);
// });


app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});

app.get("/" , (req,res)=>{
    res.send("working");
});

//new route

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
 
app.post("/chats",(req,res)=>{
    let {from , to , message} = req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date(),
    });
    newChat.save().then((res)=>{
        console.log("chat was saved");
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats"); 

});

//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params ; 
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//update route

app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params ; 
    let {message: newMessage} = req.body;
    let updatedChat =  await Chat.findByIdAndUpdate(id , {message:newMessage},{runValidatore:true , new:true});

    console.log(updatedChat);
    res.redirect("/chats");
});

app.delete("/chats/:id" ,async(req,res)=>{
    let {id} = req.params ; 
    let chatToBeDelete = await Chat.findByIdAndDelete(id);
    console.log(chatToBeDelete);
    res.redirect("/chats");

})

app.listen(8080,()=>{
    console.log("servr is running on port 8080"); 
});
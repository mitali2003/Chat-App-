const mongoose = require('mongoose');
const chat = require('./models/chat');
main().then(()=>{console.log("connection sucessfully")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/watsupp');
}

let Allchats = [
    {
        from:"Rohit",
        to:"Nisarg",
        created_at:new Date(),
        message:"hey! bro",
    },
    {
        from:"Sakshi",
        to:"jetun",
        created_at:new Date(),
        message:"love you ❤️",
    },
    {
        from:"maitri",
        to:"Bhavya",
        created_at:new Date(),
        message:"how cute",
    }
]

chat.insertMany(Allchats);

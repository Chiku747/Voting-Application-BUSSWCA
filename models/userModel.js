const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tarasbesra49:WFTr3snu1HgDuNvP@cluster0.obdl1.mongodb.net//votingApp");


const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    }
})




module.exports = mongoose.model("user", userSchema);
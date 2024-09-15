const mongoose = require("mongoose");
const userModel = require("../models/userModel")
mongoose.connect("mongodb+srv://tarasbesra49:WFTr3snu1HgDuNvP@cluster0.obdl1.mongodb.net//votingApp")




 const candidateSchema = mongoose.Schema({
    name:{
        type:String
    },
    votes:[{
        type: mongoose.Types.ObjectId,
        ref:"user"
       
    }]
 });

 module.exports = mongoose.model("candidate", candidateSchema);
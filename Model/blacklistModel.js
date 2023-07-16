const { default: mongoose } = require("mongoose");

const blacklistSchema=new mongoose.Schema({
    token:String
})

const blacklistModel=mongoose.model("BlacklistData",blacklistSchema)


module.exports=blacklistModel
const mongoose = require("mongoose")

const trackingSchema = mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    foodID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods",
        required:true
    },
    details:{
       
        calories:Number,
        protein:Number,
        carbohydrates:Number,
        fat:Number,
        fiber:Number,
       
    },
    eatenDate: {
        type: Date,
        default: () => new Date()
    },
    quantity:{
        type:Number,
        required:true
    }

},{timestamps:true})

const trackingModel = mongoose.model("trackFoods",trackingSchema)

module.exports = trackingModel;
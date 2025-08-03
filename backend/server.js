
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//models importing

const userModel = require("./models/userModel")
const foodModel = require("./models/foodModel")
const verifyToken = require("./auth/verifytoken")
const trackingModel = require("./models/trackingModel")

const app = express();

app.use(express.json())

//mongodb connection

mongoose.connect("mongodb://localhost:27017/nutrify")

.then(()=>{
    console.log("mongodb connected successfull")
})
.catch((err)=>{
    console.log(err)
})


//user registration

app.post("/register",(req,res)=>{

    let user = req.body

  
    bcrypt.genSalt(10,(err,salt)=>{
        if(!err)
        {
            bcrypt.hash(user.password,salt,async(err,hpass)=>{
                if(!err)
                {
                    user.password = hpass
                    try
                    {
                        let doc = await userModel.create(user)
                        res.send({message:"user registred successfull"})
                    }
                    catch(err)
                    {
                        console.log(err)
                        res.send({message:"user registration unsuccessfull"})
                    }
                }
            })
        }
    })
})


//user login

app.post("/login",async(req,res)=>{

    let userCred = req.body

    try
    {
        const user = await userModel.findOne({email:userCred.email})
        if(user!=null)
        {
            bcrypt.compare(userCred.password,user.password,(err,success)=>{
                if(success==true)
                {
                    jwt.sign({email:userCred.email},"nutrifyapp",(err,token)=>{
                            if(!err)
                            {
                                res.send({message:"login successfull",token:token})
                            }
                        })
                }
                else
                {
                    res.send({message:"incorrect password"})
                }
            })
        }
        else
        {
            res.send({message:"email not found"})
        }
    }
    catch
    {
        console.log(err)
        res.send({message:"login failed"})
    }

})

// to fetching the all foods

app.get("/foods",verifyToken,async(req,res)=>{

    try
    {
        let foods = await foodModel.find();
        res.send({foods,message:"fetching the food"})
    }
    catch
    {
        console.log(err)
        res.send({message:"some problem"})
    }
})

// fetch and add food by using name

app.get("/foods/:name",verifyToken,async(req,res)=>{

    try
    {
        let foods = await foodModel.find({name:{$regex:req.params.name,$options:"i"}})
        
        if(foods.length!==0)
        {
            res.send(foods);
        }
        else
        {
            res.send({message:"Food Item not Avalibile"})
        }
    }
    catch
    {
        console.log(err)
        res.send({message:"User does not have any food items"})
    }
})

//adding eaten foods to the user

app.post("/tracking",verifyToken,async(req,res)=>{

    let eatenFood = req.body
    try
    {
        let trackFood = await trackingModel.create(eatenFood);
        console.log(trackFood)
        res.send({message:"Food Added"})
    }
    catch
    {
        res.send({message:"some problem for adding food"})
    }

})


//fetch a person total eaten foods

app.get("/tracking/:userID/:date",verifyToken,async(req,res)=>{

    let userID = req.params.userID;

    let date = new Date(req.params.date)

    try
    {
        if (isNaN(date)) {
            return res.send({ message: "Invalid date format" });
        }

        // Create date range: start of day to end of day

        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
    
        // Query entries within the selected day
        const entries = await trackingModel.find({userID: userID,eatenDate: {$gte: date,$lt: nextDay}}).populate("userID","name-_id").populate("foodID")

        res.send(entries)
    }

    // let strDate = date.getDate()+"/"+(date.getMonth()+1)+date.getFullYear()

    // try
    // {
    //     let userId = await trackingModel.find({userID:userID,eatenDate:strDate})    
    //     res.send(userId);
    // }
    catch(err)
    {
        res.send({message:"some error in fetching user"})
        console.log(err)
    }
})


//server connection

app.listen(8000,()=>{
    console.log("server connected successfull in port 8000")
})

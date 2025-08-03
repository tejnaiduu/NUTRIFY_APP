
const jwt = require ("jsonwebtoken")

function verifyToken(req,res,next){

    if(req.headers.authorization!==undefined)
    {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"nutrifyapp",(err,data)=>{
            if(!err)
            {
                next();
            }
            else
            {
                res.send({message:"invaild token"})
            }
        })
    }
    else
    {
        console.log(err)
        res.send({message:"please send a token"})
    }
}

module.exports = verifyToken;
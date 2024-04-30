const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req , res, next)=>{
    try{
      const token = await req.headers.authorization || "";
      if(token){
        const response = jwt.verify(token , JWT_SECRET); //JWT_SECRET not giver
        if(response.id){
          req.authorId = response.id;
          next();
        }
      }
      else{
        c.status(404);
        return res.json({errror:"token lost"});
      }
    }
    catch(e){
      res.status(500);
      return res.json({error:"somthing wrong with the token"})
    }
  }
  
  module.exports ={authMiddleware}
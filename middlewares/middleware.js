const authlogin = (req,res,next)=>{
    const {email,password} = req.body

    if(email && password){
        next()
    }
    else{
        res.send({error:"all filds are required"})
    }
}
const authsignup = (req,res,next)=>{
    const {email,password,username,role} = req.body

    if(email && password && username && role){
        next()
    }
    else{
        res.send({error:"all filds are required"})
    }
}

module.exports={authlogin,authsignup}

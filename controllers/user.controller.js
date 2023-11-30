const { user } = require("../models/user.schema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// get route

const index = (req,res)=>{
    return res.render("index")
}

const getsignin = (req,res)=>{
    res.render('signin')
}

const getsignup = (req,res)=>{
    res.render('signup')
}


const getforget= (req,res)=>{
    res.render('forget')
}

// post routes

const signup = async(req,res)=>{
    try {
        const {username,email,password,role} = req.body

        bcrypt.hash(password,5,async(error,hash)=>{
            if(error){
                res.JSON({error:error})
            }
            else{
                let obj = {email,password:hash,username,role}
                const data = await user.create(obj)
                res.send({data:data})
            }
        })
    } catch (error) {
        return res.send({error : error.message})   
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        const data = await user.findOne({email:email})

        if(data){
            bcrypt.compare(password,data.password,(error,result)=>{
                if(error){
                    res.send({error:error.message})
                }
                if(result){
                    const token = jwt.sign({id:data._id},"private")
                    console.log(token);
                    res.cookie("token",token).send({message:"logged in"})
                }
                else{
                    res.send({message:"wrong password"})
                }
            })
        }
    else{
        res.send({error:"user not found please signup first"})
    }
    } catch (error) {
        res.send({error:error.message + "main"})
    }
    // const {email,password}= req.body
    // const data = await user.findOne({email:email})
    // if(!data){
    //     res.send("sign up first")
    // }
    // if(data.password != password){
    //     res.send({error:"password incorrect"})
    // }
    // else{
    //     return res.send({message:"logged in"})
    // }
}

const forget = async(req,res)=>{
    const {oldpass,newpass} = req.body

    if(req.user.password == oldpass){
        await user.findByIdAndUpdate(req.user.id,{password : newpass})
        res.redirect('profile')
    }
    else{
        res.redirect('signup')
    }
}

const profile= (req,res)=>{
    if(req.user){
        res.render('profile',{user:req.user})
    }
    else{
        res.redirect('signin')
    }
}

module.exports = {index,signup,getsignin,getsignup,login,getforget,forget,profile} 
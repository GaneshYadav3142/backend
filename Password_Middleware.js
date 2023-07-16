

const passValidator=(req,res,next)=>{
    const {password}=req.body
    if(!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password) || password.length<8){
        res.status(400).send("Enter Strong password")
    }
    else{
        next()
    }
}

module.exports=passValidator
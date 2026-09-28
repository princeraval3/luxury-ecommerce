const jwt = require('jsonwebtoken')



const generateAccessToken =  (user)=>{
    try {

        const accessToken = jwt.sign({
            id : user._id,
            role : user.role
        },
        process.env.JWT_SECRET , 
        {
            expiresIn : "15m"
        }
    )

    return accessToken
        
    } catch (error) {
        console.log(error);
        

        
    }
}



const generateRefreshToken = (user) =>{

    const RefreshToken = jwt.sign(
        {
            id : user._id
        },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn : "7d"}
    )


    return RefreshToken
}


module.exports = { generateAccessToken , generateRefreshToken}
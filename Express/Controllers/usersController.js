const User = require('../DataBase/Schemas/userSchemas')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const filterObj = (obj, ...allowedFields) => {
    const newObj={}
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el]=obj[el]
        }
        
    })
    return newObj
}
const getAllUsers = catchAsync(async (req, res) => {
    const user= await User.find()

    res.status(200).json({ 
        status: 'success',
        results:user.length,
        data: {
            user
        }
    })
})
const CreateUser=(req, res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not defined'
    })
}


const getUser=(req, res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not defined'
    })
}
const updateUser=(req, res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not defined'
    })
}
const deleteUser=(req, res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not defined'
    })
}
const updateMe = async(req,res,next) => {
    // !1)create a error if user POSTS paasword data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password update. please use updateMypassword',400))
    }
    

//    2)fliterd out unwanted filed names that are not updated user
    const filterdBody=filterObj(req.body,'name','email')
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterdBody, {
        returnDocument: 'after',
        runValidators:true
    })
res.status(200).json({
    status: 'success',
    user:updatedUser
    })

}
const deleteMe = catchAsync( async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(204).json({
        status: "success",
        data:null
    })
})
module.exports ={getUser,getAllUsers,CreateUser,updateUser,deleteUser,updateMe,deleteMe}
const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },

    photo: String,

    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },

    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select:false
    }
});


// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 12);
    // Don't save passwordConfirm in database
    this.passwordConfirm = undefined;
});
userSchema.pre('save', function (next) {
    if (!this.isModified('passowrd') || this.isNew) return
    this.passwordChangedAt = Date.now()-1000
    next()
})


userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    return
})
// Compare login password with hashed password
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(
        candidatePassword,
        userPassword
    );
};


// Check whether password was changed after JWT was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {

    if (this.passwordChangedAt) {

        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    return false;
};


// Generate password reset token
userSchema.methods.createPasswordResetToken = function () {

    // Raw token
    const resetToken = crypto
        .randomBytes(32)
        .toString('hex');

    // Store hashed token in database
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Token valid for 10 minutes
    this.passwordResetExpires =
        Date.now() + 10 * 60 * 1000;

    // Send raw token through email
    return resetToken;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
// const mongoose = require('mongoose');
// const crypto=require('crypto')
// const validator = require('validator');
// const bcrypt = require('bcryptjs')
// const userSchemas = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: [true,'please tell your name']
            
//         },
//         email: {
//             type: String,
//             required: [true, 'please provide your email'],
//             unique: true,
//             lowercase: true,
//             validate:[validator.isEmail,'please provide vaild email']
//         },
//         photo: String,
//         role: {
//             type: String,
//             enum: ['user', 'guide', 'lead-guide', 'admin'],
//             default:'user'
//         },
//         password: {
//             type: String,
//             required: [true,'please provide your password'],
//             minlength: 8,
//             select:false
//         },
//          confirmPassword: {
//             type: String,
//              required: [true, 'please confirm your password'], 
//              validate: {
//                  validator: function (el) {
//                 return el === this.password
//                  },
//              message:'password are not same'}
//         },
//         passwordChangedAt: Date,
//         passwordResetToken: String,
//         passwordResetExpires:Date
//     }
// )
// userSchemas.pre('save', async function (next) {
//     if (!this.isModified('password')) { return }
//     this.password = await bcrypt.hash(this.password, 12);
//     this.confirmPassword = undefined;
    
// })

// userSchemas.methods.correctPassword = async function (candidatePassword, userPassword) {
//     // console.log(candidatePassword,userPassword)
//     return await bcrypt.compare(candidatePassword,userPassword)
// }
// userSchemas.methods.changedpasswordAfter = function (JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changeTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
//         // console.log(changeTimestamp, JWTTimestamp)
//         return JWTTimestamp < changeTimestamp 
//     }
//     // false means NOT chnage   
//     return false
// }
// userSchemas.methods.createPasswordResetToken =function () {
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
//     console.log({ resetToken },this.passwordResetToken )
//     this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//     return resetToken
// }
// const user=mongoose.model('User',userSchemas)
// module.exports=user
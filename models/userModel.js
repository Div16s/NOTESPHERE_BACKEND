const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            // required: true,
        },
        email:{
            type: String,
            // required: true,
            unique: true,
        },
        password:{
            type: String,
            // required: true,
        },
        isAdmin:{
            type: Boolean,
            // required: true,
            default: false,
        },
        pic:{
            type: String,
            // required: true,
            default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
        },
    },
    {
        timestamps: true,
    }
);

//function for password encryption
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//function for password decryption
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model('User',userSchema);
module.exports = User;
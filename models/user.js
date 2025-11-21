import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: { 
        type: String, 
        unique: true,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type:String,
        required:true,
        //select: false
    },
    age: {
        type:Number,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true,
            //select:false
        }
    }],
    role: { 
        type: String, 
        enum: ["Student", "Parent", "Admin"], 
        default: "Student" 
    },
    preferences:{
        type:String
    },
    aptitude_score:{
        type:Number
    },
    career_goal:{
        type:String
    },
    School_College:{
        type:String
    }
},{timestamps:true});

//Creating tokens for current user
userSchema.methods.generateAuthToken= async function() {
    const user=this
    const token=jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET) // creates a tpken
    user.tokens=user.tokens.concat({token:token}) //adds the token to the array of tokens to the user 
    await user.save()
    return token //so that it can be used in other parts of the code
}
 
//Hashing the plain text into hashed password
//pre is a middleware which hashes password before saving the user to the database
userSchema.pre('save', async function(next){
    const user=this
 
    //hashes password only if user changes it or for first time sign up
    if(user.isModified('password'))
        {
            user.password=await bcrypt.hash(user.password, 10)
        }
    //console.log(user.password)
    next() //gives mongoose symbol to save the user
})
 
 
// Authenticating User
// statics --> method is added to User model directly 
userSchema.statics.authenticate = async function(email, password) {
    const user = await this.findOne({ email }); // use 'this' instead of 'User'
    if (!user) {
        throw new Error('Unable to find User');
    }

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
        throw new Error('Incorrect Password');
    }

    return user;
}

userSchema.methods.toJSON= function (){
    const user=this
    const userObject= user.toObject() // mongoose method
 
    delete userObject.password
    delete userObject.tokens
 
   // delete userObject.avatar
    return userObject
}
 
export default mongoose.model("User", userSchema);

import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// generrate JWT token
const generateToken = (userId) => {
    const payload = userId ;
    return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill in all fields' });
        }

        if(password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        const token = generateToken(user._id.toString())
        
        res.json({ status:true,token });
    } catch (error) {
        console.log(error.message);
        res.json({ success : false, message: error.message });
    }
};


// User Login


export const loginUser = async (req,res)=>{
    try {
        const {email, password} = req.body
        const user  = await User.findOne({email})

        if(!user){
            return res.json({success : false, message : "User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success: false,message: "Invalid Password"})
        }

        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error) {
        console.log(error.message);
        res.json({ success : false, message: error.message });
    }
}


// Get User Details using JWT token
export const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
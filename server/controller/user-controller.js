import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../model/user.js';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async(request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        const existingUser = await User.findOne({ username: request.body.username });
        if (existingUser) {
            return response.status(400).json({ msg: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user ={ 
            username: request.body.username, 
            name: request.body.name, 
            password: hashedPassword 
        };

        const newUser =  new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'signup successfull' })
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up the user' })
    }
}

// export const loginUser = async(request, response) => {
//     let user = await User.findOne({username: request.body.username});
//     if(!user){
//         return response.status(400).json({ msg: 'User not found' });
//     }
//     try{
//         let match = await bcrypt.compare(request.body.password, user.password);
//         if(match){
//             // return response.status(200).json({ msg: 'Login successfull' });
//             const accessToken = jwt.sign(user.toJSon(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
//             const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

//             const newToken = new Token({ token: refreshToken })
//             await newToken.save();

//             return response.status(200).json({
//                 accessToken: accessToken, 
//                 refreshToken: refreshToken,
//                 name: user.name,
//                 username: user.username 
//             });

//         }
//         else{
//             return response.status(400).json({ msg: 'Invalid credentials' });
//         }
//     }
//     catch(error){
//         return response.status(500).json({ msg: 'Error while logging in the user' })
//     }



export const loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(400).json({ msg: 'User not found' });
        }

        // Check if the password is provided
        if (!password) {
            return response.status(400).json({ msg: 'Password is required' });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create JWT tokens with limited user data
        const payload = { id: user._id, username: user.username };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '1D' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY);

        // Save refresh token in the database
        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        return response.status(200).json({
            accessToken,
            refreshToken,
            name: user.name,
            username: user.username,
            newToken
        });

    } catch (error) {
        console.error('Login Error:', error);
        return response.status(500).json({ msg: 'Error while logging in the user' });
    }
};

export const logoutUser = async (request, response) => {
    try {
        response.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'Strict'
        });

        return response.status(200).json({ msg: 'Logout successful' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while logging out' });
    }
};


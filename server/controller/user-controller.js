import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../model/user.js';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async(request, response) => {
    try {
        const existingUser = await User.findOne({ email: request.body.email });
        if (existingUser) {
            return response.status(400).json({ msg: 'email already exists' });
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 15);

        const user ={ 
            username: request.body.username, 
            email: request.body.email, 
            password: hashedPassword 
        };

        const newUser =  new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'signup successfull' })
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up the user' })
    }
}


export const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ msg: 'User not found' });
        }

        if (!password) {
            return response.status(400).json({ msg: 'Password is required' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { id: user._id, username: user.username };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY);

        
        const newToken = new Token({ 
            token: refreshToken,
            userId: user._id ,
            expiresAt: new Date(Date.now() + 7*24*60*60*1000) });
        await newToken.save();

        
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return response.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        return response.status(500).json({ msg: 'Error while logging in the user' });
    }
};

export const logoutUser = async (request, response) => {
    try {
       
        const refreshToken = request.cookies?.refreshToken || request.body.refreshToken;
        
        if (refreshToken) {
            await Token.findOneAndDelete({ token: refreshToken });
        }
        
        response.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        response.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return response.status(200).json({ 
            success: true,
            message: 'Logout successful' 
        });
    } catch (error) {
        console.error('Logout Error:', error);
        return response.status(500).json({ 
            success: false,
            message: 'Error while logging out' 
        });
    }
};


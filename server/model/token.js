import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {                           
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    expiresAt: {                      
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 } 
    }
}, {
    timestamps: true  
});

const token = mongoose.model('token', tokenSchema);

export default token;
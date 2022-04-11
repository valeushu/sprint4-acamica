import mon from 'mongoose';
const { Schema, model } = mon;
import bcrypt from 'bcryptjs';
/**
const userSchema = new Schema(
     
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        googleId: {
            type: String,
        },
        facebookId: {
            type: String,
        },
        discordId: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);*/

const userSchema = new Schema(
    {
        local: {
            username: { type: String },
            email: { type: String, require: true , unique: true, sparse:true},
            password: { type: String, require: true },
    
        },
        google: {
            id: { type: String },
            email: { type: String },
            
        },
        facebook: {
            id: { type: String },
            email: { type: String },
            
        },
        discord: {
            id: { type: String },
            email: { type: String },
            
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};
export default model('User', userSchema);

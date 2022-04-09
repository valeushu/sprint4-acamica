import mon from 'mongoose';
const { Schema, model } = mon;
import bcrypt from 'bcryptjs';

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
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
/** 
const userSchema = new Schema(
    {
        local: {
            username: { type: String },
            fullname: { type: String },
            email: { type: String, require: true , unique: true},
            password: { type: String, require: true },
            phone: { type: Number },
            address: { type: String },
            roles: [
              {
                ref: "Role",
                type: Schema.Types.ObjectId,
              },
            ],
        },
        google: {
            id: { type: String },
            //token: { type: String },
            email: { type: String },
            username: { type: String },
        },
        facebook: {
            id: { type: String },
            //token: { type: String },
            //email: { type: String },
            username: { type: String },
        },
        discord: {
            id: { type: String },
            //token: { type: String },
            email: { type: String },
            username: { type: String },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);**/

userSchema.statics.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};
export default model('User', userSchema);

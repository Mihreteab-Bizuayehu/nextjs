import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true })

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);


export type User = {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
}
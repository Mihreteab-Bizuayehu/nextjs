import { UserModel } from "@/lib/models/UserModel";
import dbconnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
const ObjectId = require("mongoose").Types.ObjectId;


export const GET = async () => {
    try {
        await dbconnect();
        const users = await UserModel.find();
        return NextResponse.json({users}, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Failed to fetch all users", { status: 500 });
      
    }
};

export const POST = async (request: Request) => {
    try {
        await dbconnect();
        const { username, email, password } = await request.json();
        const existedUser = await UserModel.findOne({ email });
        if (existedUser) {
            return NextResponse.json({message:`The user with ${email} already existed!`})
        }
        else {
            const user = await UserModel.create({
              username,
              email,
              password: bcrypt.hashSync(password, 12),
            });

            return NextResponse.json(user, { status: 201 });
        }

    }
    catch (error: any) {
        console.log(error);
        return new NextResponse("Failed to create a new user", { status: 500 });
    }
};

export const PATCH = async (request: Request) => {
    try {
         
        const body = await request.json();
        const { userId,newUsername,newEmail,newPassword } = body;
        await dbconnect();
        if(!userId || !newUsername || !newEmail || !newPassword){
            return new NextResponse(JSON.stringify({ message: "userId, newEmail, newPassword and newUsername are required" }), { status: 400 });
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({ message: "Invalid userId" }), { status: 400 });
        }
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: userId },
            {
                username: newUsername,
                email: newEmail,
                password: bcrypt.hashSync(newPassword, 12),
           },
          { new: true }
        );
        if (!updatedUser) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
        }
        else {
            return NextResponse.json(updatedUser, { status: 200 });
        }
        
    }
    catch (error: any) {
        throw new Error(`Error: ${error.message}`);
    }

} 

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        await dbconnect();
        if(!userId){
            return new NextResponse(JSON.stringify({ message: "userId is required" }), { status: 400 });
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({ message: "Invalid userId" }), { status: 400 });
        }

        const user = await UserModel.findByIdAndDelete({ _id: new ObjectId(userId) });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
        }
        else {
            return new NextResponse(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
        }
        }
        
    catch (error: any) {
        throw new Error("Error: ", error.message);
    }
    }
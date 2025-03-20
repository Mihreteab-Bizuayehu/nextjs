import data from "@/lib/data";
import { dbconnect } from "@/lib/dbconnect";
import { ProductModel } from "@/lib/models/ProductModel";
import { UserModel } from "@/lib/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const { products, users } = data;
    await dbconnect()
    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);
    await UserModel.deleteMany();
    await UserModel.insertMany(users);
    
    return NextResponse.json({ message: "Data imported successfully" ,products,users});
}


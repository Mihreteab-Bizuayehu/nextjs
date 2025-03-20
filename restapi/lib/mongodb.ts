import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

declare global {
    var db: Promise<typeof mongoose | undefined>;
}

const dbconnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log('Already connected to MongoDB');
        return;
    }
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in .env file');
    }
    if (global.db) {
        return global.db;
    }
    try {
        global.db = mongoose.connect(MONGODB_URI, {
           dbName: 'nextjs-restapi',
            bufferCommands: true,
        } as any);
        await global.db;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
    return global.db;
}

export default dbconnect;
import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

type MongooseConnection = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  console.log('MONGODB_URL', MONGODB_URL)
  debugger
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("❌ Falta la variable MONGODB_URL.");
  }

  console.log('MONGODB_URL', MONGODB_URL)

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "imaginify",
        // bufferCommands: false,
      });

    cached.conn = await cached.promise;

    console.log("✅ Conectado a MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw error;
  }
};

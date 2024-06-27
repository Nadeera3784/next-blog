import _mongoose, { connect } from "mongoose";
import { environment } from "../environments";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}


if (!environment.mongodbURI || environment.mongodbURI.length === 0) {
  throw new Error("Please add your MongoDB URI to .env.local");
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(environment.mongodbURI!, opts)
      .then((mongoose: any) => {
        console.log("connection established");
        return mongoose;
      })
      .catch((error: any) => {
        console.error("Connection to database failed");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
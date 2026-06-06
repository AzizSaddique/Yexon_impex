const mongoose = require("mongoose");

const defaultLocalMongoUri = "mongodb://127.0.0.1:27017/rogue_rider";

const maskMongoUri = (mongoUri) => {
  try {
    const parsedUri = new URL(mongoUri);

    if (parsedUri.password) {
      parsedUri.password = "*****";
    }

    if (parsedUri.username) {
      parsedUri.username = "*****";
    }

    return parsedUri.toString();
  } catch {
    return mongoUri.replace(/\/\/([^:@/]+):([^@/]+)@/, "//*****:*****@");
  }
};

const getMongoCandidates = () => {
  const candidates = [
    process.env.MONGODB_URI,
    process.env.MONGO_URI,
    process.env.MONGO_URI_FALLBACK,
    defaultLocalMongoUri,
  ].filter(Boolean);

  return [...new Set(candidates)];
};

const connectDB = async () => {
  const candidates = getMongoCandidates();
  let lastError;

  for (const mongoUri of candidates) {
    try {
      await mongoose.connect(mongoUri);
      console.log(`MongoDB connected: ${maskMongoUri(mongoUri)}`);
      return mongoUri;
    } catch (error) {
      lastError = error;
      console.error(`MongoDB connection failed for ${maskMongoUri(mongoUri)}: ${error.message}`);
    }
  }

  throw new Error(
    `${lastError?.message || "Could not connect to MongoDB"}. ` +
      `Check your Atlas URI or run a local MongoDB server at ${defaultLocalMongoUri}.`,
  );
};

module.exports = connectDB;

const mongoose = require('mongoose');

let isConnected = false;
let connectionError = null;

/**
 * Connect to MongoDB Atlas or local MongoDB instance
 * @param {string} [customUri] - Optional custom URI (e.g. For tests)
 */
async function connectDB(customUri) {
  const uri = customUri || process.env.MONGODB_URI;

  if (!uri) {
    connectionError = 'MONGODB_URI is not defined in environment variables. Please check your .env file.';
    console.warn('\x1b[33m%s\x1b[0m', '⚠️  [CloudGuard Warning] MONGODB_URI is not set in backend/.env.');
    console.warn('\x1b[33m%s\x1b[0m', '   Add your MongoDB Atlas connection string to connect to the cloud database.');
    return false;
  }

  try {
    // Avoid re-connecting if already connected
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      connectionError = null;
      return true;
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });

    isConnected = true;
    connectionError = null;
    console.log('\x1b[32m%s\x1b[0m', `✅ [CloudGuard] Cloud Database Connected: ${conn.connection.host} (${conn.connection.name})`);
    return true;
  } catch (error) {
    isConnected = false;
    connectionError = error.message;
    console.error('\x1b[31m%s\x1b[0m', `❌ [CloudGuard Error] MongoDB Atlas Connection Failed: ${error.message}`);
    return false;
  }
}

/**
 * Disconnect from MongoDB
 */
async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

/**
 * Get current database connection state and diagnostics
 */
function getDbStatus() {
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const stateCode = mongoose.connection.readyState;
  return {
    connected: stateCode === 1,
    state: states[stateCode] || 'Unknown',
    host: isConnected ? mongoose.connection.host : null,
    database: isConnected ? mongoose.connection.name : null,
    error: connectionError
  };
}

module.exports = {
  connectDB,
  disconnectDB,
  getDbStatus
};

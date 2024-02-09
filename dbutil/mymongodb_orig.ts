import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // your mongodb connection string
const options = {};

let client;
let clientPromise: Promise<any>;

/*declare global {
  var _mongoClientPromise: Promise<any>;
}*/
 
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  const config = {  //https://stackoverflow.com/questions/76645619/mongoose-creating-too-many-connections-in-nextjs/76905054#76905054
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 1,
    minPoolSize: 1,
    socketTimeoutMS: 20000,
    serverSelectionTimeoutMS: 10000,
    maxIdleTimeMS: 10000,
  };
  console.log('creating clientPromise');
  client = new MongoClient(uri, config);
  clientPromise = client.connect();
  console.log('connected');
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
import { MongoClient } from 'mongodb';

/*
MongoDB Issue
https://github.com/vercel/vercel/issues/10671
https://stackoverflow.com/questions/76645619/mongoose-creating-too-many-connections-in-nextjs/76905054#76905054
https://github.com/vercel/next.js/discussions/12229
https://www.mongodb.com/community/forums/t/no-way-to-avoid-replicasetnoprimary-errors/243498/12
https://www.mongodb.com/community/forums/t/inconsistent-mongoserverselectionerror-server-selection-timed-out-after-30000-ms/137402/3
https://github.com/nextauthjs/next-auth/discussions/4165
https://www.reddit.com/r/nextjs/comments/14kipzk/mongoserverselectionerror_when_using_api_routes/

*/

const uri = process.env.MONGODB_URI as string; // your mongodb connection string
const options = {//https://stackoverflow.com/questions/76645619/mongoose-creating-too-many-connections-in-nextjs/76905054#76905054
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 1,
  minPoolSize: 1,
  socketTimeoutMS: 1000,
  serverSelectionTimeoutMS: 10000,
  maxIdleTimeMS: 1000,};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;
  private constructor() {
    console.log("Calling constructor");
    this.client = new MongoClient(uri, options);
    console.log("Creating New ClientPromise");
    this.clientPromise = this.client.connect();
     console.log("ClientPromise Connected");
    /*if (process.env.NODE_ENV === 'development') {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      console.log("setting local");
      global._mongoClientPromise = this.clientPromise;
    }*/
  }

  public static get instance() {
    if (!this._instance) {
      console.log("calling constructur");
      this._instance = new Singleton();
    } else {
      console.log("returning existing clientPromise");
    }
    return this._instance.clientPromise;
  }
}
const clientPromise = Singleton.instance;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function getDBConnection(promise:Promise<MongoClient>):Promise<MongoClient>{
  try{
    let tempClient = await promise;
    console.log("returning good client");
    return tempClient;
  } catch (e){
    console.error("Error handling connection "+JSON.stringify(e));
    const temp = Singleton.instance;
    let retry  = await temp;
    return retry;
  }



}
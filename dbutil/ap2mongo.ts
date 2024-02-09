import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // your mongodb connection string

const options = {//https://stackoverflow.com/questions/76645619/mongoose-creating-too-many-connections-in-nextjs/76905054#76905054
    useNewUrlParser: true,
    useUnifiedTopology: false,
    maxPoolSize: 1,
    minPoolSize: 0,
    socketTimeoutMS: 1000,
    serverSelectionTimeoutMS: 10000,
    maxIdleTimeMS: 1000,
};

let sharedPromise: Promise<MongoClient>;

export function getMongoConnection(): Promise<MongoClient> {

    try {
        if (sharedPromise) {
            console.log("return sharedPromise");
            return sharedPromise;
        }
        console.log("getMongoConnection called");
        const client: MongoClient = new MongoClient(uri, options);

        /* DEBUG */
        client.on('error', (error) => {
            if (error) {
                console.error(error, `Event close client: ${error.message}`);
            }
        });
        client.on('close', (info: any) => {
            console.log('CLOSING DB CONN!', info);
        });
        client.on('connectionClosed', (info: any) => {
            console.log('CLOSING DB CONN!', info);
        });
        client.on('serverClosed', (info) => {
            console.log('serverClosed!', info);
        });
        client.on('serverHeartbeatFailed', (event) => {
            console.log("serverHeartbeat issue (might not be an error): "+JSON.stringify(event));
        });

        client.on('timeoout', (e) => {
            console.log(`Timeout: ${JSON.stringify(e)}`);
        });
        /* debug*/

        const clientPromise: Promise<MongoClient> = client.connect();
        sharedPromise = clientPromise;
        return clientPromise;
    } catch (error) {
        console.log("Error in getMongoConnection, try again");
        const client: MongoClient = new MongoClient(uri, options);
        const clientPromise: Promise<MongoClient> = client.connect();;
        return clientPromise;
    }

}
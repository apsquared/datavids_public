
import * as DB from '@/dbutil/dbmain'
import { getMongoConnection } from './ap2mongo';


export async function addToWaitlist(email:string):Promise<boolean> {

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.WAITLIST_COLL);


    const res = await collection.insertOne({
        email:email,
        createdOn:new Date()
    });
    if (res){
        if (res.insertedId){
            //console.log("db save worked");
            return true
        }
    }
    
    return false;
}
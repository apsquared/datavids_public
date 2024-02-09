
import * as DB from '@/dbutil/dbmain'
import { Item } from '@/types/item'
import { getMongoConnection } from './ap2mongo';

export async function createItem(itm:Item):Promise<boolean> {
    console.log("createItem called");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.ITEM_COLL);


    const res = await collection.insertOne(itm); 
    if (res){
        if (res.insertedId){
            //console.log("db save worked");
            return true
        }
    }
    
    return false;
}
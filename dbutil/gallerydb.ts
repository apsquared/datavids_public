
import * as DB from '@/dbutil/dbmain'
import { Gallery } from '@/types/gallery';
import { getMongoConnection } from './ap2mongo';

export async function addToGallery(userid:string, name:string, url:string, image?:string, link?:string, description?:string):Promise<boolean> {
    const GALLERY_COLL:string = "Gallery";

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(GALLERY_COLL);
    let galleryItem:Gallery={userid:userid,url:url,name:name,link:link,description:description,image:image,active:true};
    galleryItem.addedOn=new Date();
    const res = await collection.insertOne(galleryItem);
    if (res){
        if (res.insertedId){
            //console.log("db save worked");
            return true
        }
    }
    
    return false;
}



export async function getGalleryItems():Promise<Gallery[]> {
    const GALLERY_COLL:string = "Gallery";

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(GALLERY_COLL);
    const cursor =  await collection.find({},{ projection: { _id: 0}});
    const reqs = await cursor.toArray() as unknown;
    await cursor.close();       //try new approach https://github.com/vercel/next.js/discussions/12229#discussioncomment-363517
    return reqs as Gallery[];
}
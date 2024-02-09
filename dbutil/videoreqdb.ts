
import * as DB from '@/dbutil/dbmain'
import { UserVideoRequest, VideoStatus } from '@/types/uservideoreq'
import { ObjectId } from 'mongodb';
import { getMongoConnection } from './ap2mongo';

export type GenericCount = {
    _id:string,
    count:number,
}

export async function createVideoRequest(vidReq:UserVideoRequest):Promise<string> {
    console.log("createVideoRequest called");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);


    const res = await collection.insertOne(vidReq as unknown as Document);
    if (res){
        if (res.insertedId){
            //console.log("db save worked");
            return res.insertedId.toString()
        }
    }
    return '';
}

export async function resaveVideoRequest(videoid:string,vidReq:UserVideoRequest):Promise<string> {
    console.log("createVideoRequest called");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);


    const res = await collection.replaceOne({
        _id: new ObjectId(videoid)
    }, vidReq
    );
    if (res.modifiedCount === 1) {
        console.log('Document replaced successfully.');
        return videoid;
    } else {
    console.log('No documents matched the query. Document not replaced.');
    return '';
    }
}


export async function updateVidReq(vidReq:UserVideoRequest, renderId:string, bucketName:string):Promise<boolean>{

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const query = { _id : new ObjectId(vidReq._id) };

    console.log ("QUERY "+JSON.stringify(query));

    const update = { $set: { renderId : renderId, bucketName:bucketName,startTime: new Date() , status:VideoStatus.INPROGRESS,updateTime: new Date() } };

    const result = await collection.updateOne(query, update);
    // console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    if (result.modifiedCount==1)
        return true;
    
    console.log("ERROR: ModifiedCount "+result.modifiedCount);
    return false;
}

export async function completeVidRequest(vidReq:UserVideoRequest, filelocation:string):Promise<boolean>{

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const query = { _id : new ObjectId(vidReq._id) };

    //console.log ("QUERY "+JSON.stringify(query));
    console.log("Updating "+vidReq._id+" with file "+filelocation);

    const update = { $set: { videoUrl : filelocation, status :VideoStatus.COMPLETE, completionTime: new Date(),updateTime: new Date(), } };

    const result = await collection.updateOne(query, update);
    // console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);

    if (result.modifiedCount==1)
        return true;
    
    console.log("ERROR: ModifiedCount "+result.modifiedCount);
    return false;
}

export async function setVidReqError(vidReq:UserVideoRequest, errorMsg:string):Promise<boolean>{

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const query = { _id : new ObjectId(vidReq._id) };

    //console.log ("QUERY "+JSON.stringify(query));

    const update = { $set: { errorMsg : errorMsg, status :VideoStatus.ERROR, completionTime: new Date(),updateTime: new Date() } };

    const result = await collection.updateOne(query, update);
    // console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);

    if (result.modifiedCount==1)
        return true;
    
    console.log("ERROR: ModifiedCount "+result.modifiedCount);
    return false;
}

export async function getAllVideoRequests():Promise<UserVideoRequest[]>{
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        {
            $addFields: {
                _id: { $toString: "$_id" }
            }
        }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray();
    //console.log(JSON.stringify(reqs[0]));
    return reqs as UserVideoRequest[];
}

export async function getUserVideoRequests(userid:string):Promise<UserVideoRequest[]>{
    console.log("Calling getUserVideoRequests");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        {
            $match:{
                userid: userid
            },
        },
        {
            $addFields: {
                _id: { $toString: "$_id" }
            }
        },
        {
            $sort: {
                updateTime: -1, 
            }
         }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray();
    //console.log(JSON.stringify(reqs[0]));
    return reqs as UserVideoRequest[];
}

export async function getAllQueuedRequests():Promise<UserVideoRequest[]>{
    const client = await getMongoConnection();
    console.log("await clientPromise for getAllQueuedRequests successful");
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        {
            $match: {
                status: VideoStatus.QUEUED,
            }
        },
        {
            $addFields: {
                _id: { $toString: "$_id" }
            }
        },
        {
            $sort: {
                requestTime: -1, 
            }
         }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray();

    //console.log(reqs);
    return reqs as UserVideoRequest[];
}

export async function getAllInProgressRequests():Promise<UserVideoRequest[]>{
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        {
            $match: {
                status: VideoStatus.INPROGRESS,
            }
        },
        {
            $addFields: {
                _id: { $toString: "$_id" }
            }
        },
        {
            $sort: {
                requestTime: -1, 
            }
         }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray();

    //console.log(reqs);
    return reqs as UserVideoRequest[];
}

export async function getRequestCountByStatus():Promise<GenericCount[]>{
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray() as GenericCount[];
    return reqs;
}

export async function getVideoRequestById(id:string):Promise<UserVideoRequest>{
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        {
            $match: {
                _id:new ObjectId(id)
            }
        },
        {
            $addFields: {
                _id: { $toString: "$_id" }
            }
        },
        {
            $sort: {
                requestTime: -1, 
            }
         }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray();

    //console.log(reqs);
    return reqs[0] as UserVideoRequest;
}


export async function getRequestCountByStatusNotUs():Promise<GenericCount[]>{
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        {
            $match: {
                userid:{$nin:['653c1de38fcf2bde8dc40f65','653d160e8cac36b72e58e676','657a2ad11a7d3d5e11a8fa8b','657b76e19a454747ec267355','657b943ae91964f186ae4a47','657ba9bdf6f41bdceeee70b3','657d0e87fc28467a830cbde3','657df67f278e245eb965d26c']}
            }
        },
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray() as GenericCount[];
    return reqs;
}

export async function getVideoRequestsByStatusNotUs(status:number):Promise<UserVideoRequest[]>{
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(DB.VIDEO_REQS_COLL);
    const pipeline = [
        {
            $match:{
                status: status,
                userid:{$nin:['653c1de38fcf2bde8dc40f65','653d160e8cac36b72e58e676','657a2ad11a7d3d5e11a8fa8b','657b76e19a454747ec267355','657b943ae91964f186ae4a47','657ba9bdf6f41bdceeee70b3','657d0e87fc28467a830cbde3','657df67f278e245eb965d26c']}
  
            },
        },
        {
            $addFields: {
                _id: { $toString: "$_id" }
            }
        }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray();
    //console.log(JSON.stringify(reqs[0]));
    return reqs as UserVideoRequest[];
}

// Create getVideoRequestsByUser

// Create getAllVideoRequests (admin)

// Create getVideoRequestsBy ()
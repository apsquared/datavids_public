
import {UserDetails}  from '@/types/userdetails'
import * as DB from '@/dbutil/dbmain'
import { getMongoConnection } from './ap2mongo';

export const USER_DETAILS_COLL:string = 'userdetails';



export async function createUserDetails(details: UserDetails):Promise<boolean> {
    console.log("createUserDetails called");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
    const res = await collection.insertOne({...details,apikey:generateApiKey()});
    if (res){
        if (res.insertedId){
           return true
        }
    }
    return false;
  }

  export async function updateUserDetailsRole(userid:string,newrole:string):Promise<boolean> {
    console.log("updateuserrole called");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
    const res = await  collection.updateOne(
      { userid: userid },
      { $set: { 'role': newrole } }
    );
    if (res.matchedCount==1){
        return true;
    } else {
        return false;
    }
  }

  export async function updateUserAPIKey(userid:string):Promise<boolean> {
    console.log("updateuserrole called");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
    const res = await  collection.updateOne(
      { userid: userid },
      { $set: { 'apikey': generateApiKey() } }
    );
    if (res.matchedCount==1){
        return true;
    } else {
        return false;
    }
  }

  export async function getUserDetails(userid:string):Promise<UserDetails|null> {
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
   //console.log("finding ud "+userid);
    const ud =  await collection.findOne({userid:userid},{ projection: { _id: 0}}) as unknown as UserDetails;
    //console.log("resp"+JSON.stringify(ud));
    return ud;
  }

  export async function getUserList():Promise<UserDetails[]|null> {
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
   // console.log("finding all users");
  
    const results = await collection.find().toArray();
    //console.log(results);
    return results as unknown as UserDetails[] | null;
  }

  export async function getUserByAPIKey(apikey:string):Promise<UserDetails|null>{

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
    //console.log("finding ud by api key"+apikey);
    const ud =  await collection.findOne({apikey:apikey},{ projection: { _id: 0}}) as unknown as UserDetails;
   // console.log("resp"+JSON.stringify(ud));
    return ud;

  }

  function generateApiKey():string{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = 16;
    let apiKey = '';
    for (let i = 0; i < length; i++) {
        apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
  }

  export async function updateUserDetailsStripe(userid:string,custid:string):Promise<boolean> {
    console.log("update stripe for user details called");
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
    const res = await  collection.updateOne(
      { userid: userid },
      { $set: { 'stripe_customerid': custid } }
    );
    if (res.matchedCount==1){
        return true;
    } else {
        return false;
    }
  }

  export async function getUserDetailsByStripeID(stripe_customerid:string):Promise<UserDetails|null> {
    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(USER_DETAILS_COLL);
    //console.log("finding ud "+userid);
    const ud =  await collection.findOne({stripe_customerid:stripe_customerid},{ projection: { _id: 0}}) as unknown as UserDetails;
    //console.log("resp"+JSON.stringify(ud));
    return ud;
  }
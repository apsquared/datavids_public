import { Ledger } from '@/types/ledger';
import { addToLedger } from '@/dbutil/ledgerdb';

//TYPES : CREDIT / DEBIT 
//SUBTYPES: for CREDIT   (ADMIN/BUY) - price id // for USE - each type of use AI/RENDER etc
//reference : for buy - stripe transdi  /// for use video id
//note : what is displayed to user  

const ADMIN_DESC="Admin Adjustment";
const NEW_USER_CREDITS=5;
const NEW_USER_DESC="New User Bonus";

export const AI_COST=1;

export async function addAdminGrantedCreditsToLedger(userid:string,amount:number):Promise<boolean> {

    let ledgerItem : Ledger = {userid:userid!,type:"ADD",subtype:"ADMIN",amount:amount,note:ADMIN_DESC};
    ledgerItem.createdOn=new Date();
    return await addToLedger(ledgerItem);

}
export async function addNewUserCreditsToLedger(userid:string):Promise<boolean> {

    let ledgerItem : Ledger = {userid:userid!,type:"ADD",subtype:"BONUS",amount:NEW_USER_CREDITS,note:NEW_USER_DESC};
    ledgerItem.createdOn=new Date();
    return await addToLedger(ledgerItem);

}

export async function addUserActionToLedger(userid:string,action:string,ref:string,credits:number,desc:string):Promise<boolean> {
    
    
    let ledgerItem : Ledger = {userid:userid!,type:"USE",subtype:action,reference:""+ref,amount:credits,note:desc};
    ledgerItem.createdOn=new Date();
    return await addToLedger(ledgerItem);

}

export async function addAICreationToLeder(userid:string,ref:string):Promise<boolean> {
    let cost=-1*AI_COST;
    let ledgerItem : Ledger = {userid:userid!,type:"USE",subtype:"AICREATE",reference:""+ref,amount:cost,note:"AI Generation of New Video"};
    ledgerItem.createdOn=new Date();
    return await addToLedger(ledgerItem);

}

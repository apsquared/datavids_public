
import * as DB from '@/dbutil/dbmain'
import { Ledger } from '@/types/ledger';
import { Product } from '@/types/product';
import { stripe } from '@/utils/stripe';
import { OptionalId } from 'mongodb';
import { getMongoConnection } from './ap2mongo';



export async function addToLedger(ledgerItem:Ledger):Promise<boolean> {
    const LEDGER_COLL:string = "Ledger";

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(LEDGER_COLL);
    ledgerItem.createdOn=new Date();
    console.log("Adding to ledger "+ledgerItem.type);
    const res = await collection.insertOne(ledgerItem as unknown as Document);
    if (res){
        if (res.insertedId){
            //console.log("db save worked");
            return true
        }
    }
    
    return false;
}
export async function getCreditHistoryForUser(userid:string):Promise<Ledger[]> {
    const LEDGER_COLL:string = "Ledger";

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(LEDGER_COLL);
    const pipeline = [
        {
            $match:{
                userid: userid
            },
        }, {
            $addFields: {
                _id: { $toString: "$_id" }
            }
        },
        {
            $sort: {
                createdOn: -1, 
            }
         }
    ];
    const reqs =  await collection.aggregate(pipeline).toArray();
    return reqs as Ledger[];
}
export async function getUserCreditBalance(userid:string):Promise<number> {
    const LEDGER_COLL:string = "Ledger";

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(LEDGER_COLL);
    try{
            const total=await collection.aggregate(
                [
                    {$match: {userid:userid}},
                    {$group:{
                        _id:"$userid",
                    amount:{
                                $sum:"$amount"
                            }
                        
                    }}
                ]
                ).toArray()
            if(total!=null)
                {
                    //console.log("total="+total[0].amount);
                    return total[0].amount;
                }
            }
            catch(err){
                return 0;
            }
    return 0;
}


export async function addProduct(product:Product):Promise<boolean> {
    const PRODUCT_COLL:string = "Products";

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(PRODUCT_COLL);
   
    const res = await collection.insertOne(product);
    if (res){
        if (res.insertedId){
            //console.log("db save worked");
            return true
        }
    }
    
    return false;
}


export async function getProducts():Promise<Product[]> {
    const PRODUCT_COLL:string = "Products";

    const client = await getMongoConnection();
    const collection = client.db(DB.MAIN_DB).collection(PRODUCT_COLL);
    const reqs =  await collection.find({}).toArray() as any;
    if(reqs==null || reqs.length==0)
    {
        const products=await stripe.products.list({active:true});
        for(var i=0;i<products.data.length;i++)
        {
            console.log("need to add products in db call");

            let price=await stripe.prices.list({active:true,product:products.data[i].id});
            let credits=+price.data[0].metadata.CREDITS;
            let p:Product={stripeid:price.data[0].id as string,name:products.data[i].name,desc:products.data[i].description as string,cost:price.data[0].unit_amount!,credits:credits as number};
            await addProduct(p);
        }
        return getProducts();

    }else{
    console.log("here in db call "+reqs.length);

    return reqs as Product[];
    }
}
export type Ledger = {
  _id?: string,
  userid: string,
  type:string;
  amount: number,
  note: string;
  subtype?:string;
  reference?:string;
  createdOn?:Date
};


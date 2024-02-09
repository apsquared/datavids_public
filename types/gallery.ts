export type Gallery = {
  userid: string;
  url: string;
  link?: string;
  name:string,
  description?:string,
  image?: string;
  addedOn?:Date;
  active?:boolean;
};

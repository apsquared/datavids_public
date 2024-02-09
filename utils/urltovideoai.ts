import { OpenAI, OpenAICallOptions } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import {HtmlToTextTransformer} from "langchain/document_transformers/html_to_text"
import { StructuredOutputParser } from "langchain/output_parsers";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { z } from "zod";
import metafetch from 'metafetch';
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

import {
    PlaywrightWebBaseLoader,
    Page,
    Browser,
  } from "langchain/document_loaders/web/playwright";
import { extractTextFromURL } from "./mycheerio";

interface titleAndSubtitle{
    title:string,
    subtitle:string,
}

interface MetaInfo  {
    title?:string,
    description?:string,
    image?:string,
}

export interface AIVideoScript{
    scenes:titleAndSubtitle[],
    image?:string,
    bgmusicEmotion?:string,
    searchTerm?:string,
}

export async function getWebsiteData(url:string):Promise<{webdata:string,metadata:MetaInfo}>{

    const webpage =  await getDocument3(url); 
    const metadata = await getMetadata(url);

    return {webdata:webpage,metadata:metadata};

}

export async function createVideoScript(url: string,webdata:string,metadata:MetaInfo, usertip?:string, duration?:string,bgmusic?:boolean):Promise<AIVideoScript> {


   console.log("metadataimage "+metadata.image);

   const content = "\nTitle: "+ metadata.title +"\Description: "+metadata.description +"\n\n"+webdata;

   let usertipFull = "";
   if (usertip){
    usertipFull = " Incorporate the input of the user in your script: "+usertipFull;
   }
   let audioPrompt = "";
   if (bgmusic){
    audioPrompt = "Based on the content of this page which of the following emotions do you think best describe the type of background music that fits? upbeat, dramatic, relaxed, rock, chill"
   }


   const durationInt = (duration ? +duration : 12);
   const scenes = Math.round(durationInt/6);
   
   const parser = StructuredOutputParser.fromZodSchema(
    z.object( { 

        scenes: z.array(z.object({
            title: z.string().describe("title scene"),
            subtitle: z.string().describe("subtitle of scene"),
 
         })),
         bgmusicEmotion:z.string().optional().describe("emotion of the background music upbeat, dramatic, relaxed, rock, chill"),
         searchTerm:z.string().optional().describe("a search term to use to look up stock videos or images")
    }));

    const formatInstructions = parser.getFormatInstructions();
 
    const prompt = new PromptTemplate({
        template:
        "Respond only with JSON.\nCreate a short script for the following webpage \"CONTENT\", suitable for a viral tik tok.  it should be broken up into "+scenes+" scenes." + 
        "Each scene should have a title and subtitle to shown in the video, each of which should be a maximum of 7 words.  " +
        "The first scene should say something engaging to get the viewers attention. {audioPrompt} {usertip}\n"+
        "Also include a one word search term that could be used to look up additional stock photos or videos related to this content.  This term should be a common term that is likely to show up in a search.\n"+
        "Only include the JSON requested not a schema.\n{format_instructions}\nCONTENT:\n{content}\n\n",
        inputVariables: ["content","audioPrompt","usertip"],        
        partialVariables: { format_instructions: formatInstructions },
    });

    const model = new OpenAI({ temperature: 0.5, modelName:'gpt-4' });  //gpt-3.5-turbo 

    const input = await prompt.format({
        content: content,
        audioPrompt: audioPrompt,
        usertip:usertipFull,
    });

    //console.log("Prompt: "+input);


    const response = await model.call(input);

    console.log("AI RESP:"+JSON.stringify(response));

    const respstr:unknown = await parser.parse(response);


    let retVal = respstr as AIVideoScript;
    retVal = {
        ...retVal,
        image:metadata.image as string,
    }
    
    console.log("RETVAL from AI"+JSON.stringify(retVal));
    return retVal;
}

async function getMetadata(url:string):Promise<MetaInfo>{

    let info:MetaInfo = {title:"",description:"",image:""};

    const meta = await metafetch.fetch(url);
        console.log('title: ', meta.title);
        console.log('description: ', meta.description);
        console.log('image:' +meta.image);
        //console.log('images '+meta.images)
        info = {
            title: meta.title,
            description: meta.description,
            image: meta.image,
        }
        /*
        console.log('type: ', meta.type);
        console.log('url: ', meta.url);
        console.log('ampURL: ', meta.ampURL);
        console.log('siteName: ', meta.siteName);
        console.log('charset: ', meta.charset);
        console.log('image: ', meta.image);
        console.log('meta: ', meta.meta);
        console.log('images: ', meta.images);
        console.log('links: ', meta.links);
        console.log('headers: ', meta.headers);
        console.log('language: ', meta.language);*/

    return info;
}


async function getDocument2(url:string):Promise<string>{

    const loader = new PlaywrightWebBaseLoader(url,{
        launchOptions: {
            headless: true,
          },
          gotoOptions: {
            waitUntil: "domcontentloaded",
          },
    });
    const docs = await loader.load();
    //console.log("DOCS "+JSON.stringify(docs));

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("js",{
        chunkOverlap:100,
        chunkSize:1000,
    });
    const transformer = new HtmlToTextTransformer();
    
    const sequence = splitter.pipe(transformer);
    
    const newDocuments = await sequence.invoke(docs);

    //console.log("NEWDOCS "+JSON.stringify(newDocuments));

    const content = newDocuments.map(obj => obj.pageContent).join(" ");

    console.log("CONTENT "+content);

    if (content.length < 50000)
       return content;
    else 
        return content.substring(0,50000);

}


async function getDocument3(url:string):Promise<string>{
   
    const text = await extractTextFromURL(url);
    console.log("text extracted from website "+url+": "+text);
    return text;


}

//could try this https://github.com/NexTech-Fusion/Rawen-toolbelt/blob/main/general/ts/website-extractor.tool.ts
//or this https://medium.com/geekculture/how-to-build-programmatic-screenshots-of-any-website-in-seconds-using-next-js-b33fed502c7c

async function getDocument(url:string):Promise<string>{

    const loader = new CheerioWebBaseLoader(   //https://github.com/cheeriojs/cheerio/issues/3457
        url,
        {selector:"h1,h2,h3,h4,title"}
      );

    const docs = await loader.load();
    console.log("DOCS "+JSON.stringify(docs));


    const splitter =  new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 5,
      });

    const transformer = new HtmlToTextTransformer();
    
    const sequence = splitter.pipe(transformer);
    
    const newDocuments = await sequence.invoke(docs);

    //console.log("NEWDOCS2 "+JSON.stringify(newDocuments));

    const content = newDocuments.map(obj => obj.pageContent).join(" ");

    console.log("CONTENT OF WEBPAGE: "+content);

    if (content.length < 30000)
       return content;
    else 
        return content.substring(0,30000);

}



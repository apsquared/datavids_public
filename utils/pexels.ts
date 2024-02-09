

import { VideoStatus } from '@/types/uservideoreq';
import { createClient,ErrorResponse,Videos } from 'pexels';

const pexelkey = 'dLCc35Oarwd5C7dvUX730YkmEYMThVOA7NXcxYKq3G0wSAcKuJ6MO26H'

const client = createClient(pexelkey);

export type DVVideoResult = {

    width: number,
    height: number,
    image: string,
    duration: number,
    videoLink: string,
    quality:string,
}


export async function findVerticalVideos(query:string):Promise<DVVideoResult[]>{

    const vids = await client.videos.search({ 
        query,
        orientation:'portrait', 
        per_page: 12 
    })
    let results:DVVideoResult[] = [];

    if (isVideo(vids)){
        vids.videos.forEach(vid => {
            for (let i = 0; i < vid.video_files.length ; i++) {
                const vfile = vid.video_files[i];
                if (vfile.height && vfile.height>1800){
                    //found a good file
                    results.push({
                        width: vfile.width as number,
                        height: vfile.height,
                        image: vid.image,
                        duration: vid.duration,
                        videoLink: vfile.link,
                        quality:vfile.quality,
                    });
                    break;
                }
            }
        });
    } else {
        //ERROR
    }

    //console.log("PEXEL RESPONSE: "+JSON.stringify(vids));
    console.log("results "+JSON.stringify(results));
    return results;
}

function isVideo(x:any): x is Videos{
    return x && 'total_results' in x;
}
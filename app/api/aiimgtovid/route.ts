
import Replicate from "replicate";

const auth = "r8_R2W8T97dXxA3cu5MXQ9I7JdOolPJchs1tR5oM"
export const maxDuration = 60; // This function can run for a maximum of 60 seconds


//https://replicate.com/docs/webhooks

export async function GET(request: Request) {

    ////console.log("here");
    const { searchParams } = new URL(request.url);
    const imgurl = searchParams.get("imgurl");

    console.log("IMGURL "+imgurl)

    const replicate = new Replicate({
    auth: auth,
    });


    const output = await replicate.run(
        "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
        {
          input: {
            cond_aug: 0.02,
            decoding_t: 7,  //use 14 for 25 frame
            input_image: imgurl, 
            video_length: "14_frames_with_svd", //25_frames_with_svd_x
            sizing_strategy: "maintain_aspect_ratio",
            motion_bucket_id: 127,
            frames_per_second: 5
          }
        }
      );
      console.log(output);
  
  
    return new Response(JSON.stringify({videourl:output}), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  
  }
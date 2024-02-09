import { DVVideoResult, findVerticalVideos } from "@/utils/pexels";


export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (query){
        const results:DVVideoResult[] = await findVerticalVideos(query as string);
        return new Response(JSON.stringify( {results:results} ), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    } else {
        return new Response(JSON.stringify({error:"missing query"}), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }

}
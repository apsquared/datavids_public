

export type Count = {
    count:number,
    type:string,
}
//console.log("TEST");

export async function GET(request: Request) {

  ////console.log("here");
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");


  return new Response(JSON.stringify({count:Math.random(),type:type}), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });

}
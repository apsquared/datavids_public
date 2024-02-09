export async function fetchGetJSON(url: string) {
    try {
      const data = await fetch(url).then((res) => res.json())
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw err
    }
  }
  
  export async function fetchPostJSON(url: string, data?: {}) {
    try {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
      })
      return await response.json() // parses JSON response into native JavaScript objects
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      throw err
    }
  }

  export const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
  };
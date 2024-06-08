import { context } from "./constant";

export default async function fapi(mode: string, args: any) {
  const body = { context, ...args };
  try {
    return await (
      await fetch(`https://music.youtube.com/youtubei/v1/${mode}?prettyPrint=false`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            "X-Goog-Visitor-Id": context.client.visitorData,
            "X-Youtube-Bootstrap-Logged-In": "false",
            "X-Youtube-Client-Name": "67",
            "X-Youtube-Client-Version": "1.20240522.01.00",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "same-origin",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://music.youtube.com",
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors",
      })
    ).json();
  } catch(err) {
    throw err
  }
}

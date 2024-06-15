import { TextComponentDetail } from "@/app/api/featured/route";

export const randomIp = (): string => {
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += Math.floor(Math.random() * 255) + 1;
    if (i < 3) {
      result += ".";
    }
  }
  return result;
};

export const randomVisitorId = (): string => {
  const alphanum =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 21; i++) {
    result += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
  }
  result += "--";
  for (let i = 0; i < 19; i++) {
    result += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
  }
  return result + "%3D%3D";
};

export const parseTitle = (runs: any[]): TextComponentDetail[] => {
  return runs.map((r: any) => {
    const text: string = r.text;
    const type: string = r.navigationEndpoint?.watchEndpoint
      ? "watch"
      : r.navigationEndpoint?.browseEndpoint.browseEndpointContextSupportedConfigs.browseEndpointContextMusicConfig.pageType
          .replace("MUSIC_PAGE_TYPE_", "")
          .toLowerCase();
    const id: string =
      r.navigationEndpoint?.watchEndpoint?.videoId ||
      r.navigationEndpoint?.browseEndpoint?.browseId;
    return { id, text, type };
  });
};

export type Chunk = {
  req_url: string;
  start: number;
  end: number;
};

export type StreamingFormat = {
  itag: number;
  url: string;
  mimeType: string;
  bitrate: number;
  width?: number;
  height?: number;
  initRange: { start: string; end: string };
  indexRange: { start: string; end: string };
  lastModified: string;
  contentLength: string;
  quality: string;
  fps?: number;
  qualityLabel: string;
  projectionType: string;
  averageBitrate: number;
  approxDurationMs: string;
  highReplication?: boolean;
  audioQuality?: string;
  audioSampleRate?: string;
  audioChannels?: number;
  loudnessDb?: number;
};

export type Track = {
  videoId: string;
  title: { text: string };
  subtitle: { text: string };
  thumbnail: string;
};

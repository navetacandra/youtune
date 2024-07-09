type Chunk = {
  req_url: string;
  start: number;
  end: number;
};

export type Track = {
  videoId: string;
  title: { text: string };
  subtitle: { text: string };
  thumbnail: string;
};

export const chunksToURL = (
  chunks: Chunk[],
  abortSignal?: AbortSignal,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    abortSignal?.addEventListener("abort", () =>
      reject(new DOMException("Request aborted", "AbortError")),
    );

    const fetchChunk = async (url: string, abortSignal?: AbortSignal) => {
      const response = await fetch(url, { signal: abortSignal });
      if (!response.ok) throw new Error(`Failed to fetch chunk from ${url}`);
      return await response.arrayBuffer();
    };

    try {
      const chunkArrayBuffers = await Promise.all(
        chunks.map((chunk) => fetchChunk(chunk.req_url, abortSignal)),
      );

      const totalLength = chunkArrayBuffers.reduce(
        (sum, buffer) => sum + buffer.byteLength,
        0,
      );
      const combinedBuffer = new Uint8Array(totalLength);

      let offset = 0;
      for (const buffer of chunkArrayBuffers) {
        combinedBuffer.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
      }

      const audioBlob = new Blob([combinedBuffer], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      resolve(audioUrl);
    } catch (error: any) {
      if (error.name === "AbortError") {
        reject(new DOMException("Request aborted", "AbortError"));
      } else {
        reject(error);
      }
    }
  });
};

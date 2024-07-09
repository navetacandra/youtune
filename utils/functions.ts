type Chunk = {
  req_url: string;
  start: number;
  end: number;
};

export const chunksToURL = async (chunks: Chunk[]) => {
  const fetchChunk = async (url: string) => {
    const response = await fetch(url);
    return await response.arrayBuffer();
  };

  const chunkArrayBuffers = await Promise.all(
    chunks.map((chunk) => fetchChunk(chunk.req_url)),
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
  return audioUrl;
};

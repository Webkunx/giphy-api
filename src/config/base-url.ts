import { appConfig } from "./app.config";

export const baseGifUrl = (query: string, limit: number) => {
  const apiKey = appConfig.giphyKey;
  return `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}`;
};

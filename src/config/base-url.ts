// export type TbaseGifUrl = (a: string) => string;
import * as dotenv from "dotenv";
dotenv.config();

export const baseGifUrl = (query: string, limit: number) => {
  const apiKey = process.env.GIPHY_KEY;
  return `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}`;
};

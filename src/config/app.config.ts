import * as dotenv from "dotenv";
dotenv.config();
export const appConfig: TAppConfig = {
  port: parseInt(process.env.PORT),
  secretKeyJwt: process.env.SECRET_KEY_JWT,
  expirationJwtTokenTime: parseInt(process.env.EXPIRATION_JWT_TOKEN_TIME) + "s",
  giphyKey: process.env.GIPHY_KEY,
};

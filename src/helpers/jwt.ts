import config from "config";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { TokenDetails } from "../models/user/user-interfaces";

const JWT_ENV: any = config.get("jwt");

const signAccessToken = (payload: any) => {
  return new Promise((resolve, reject) => {
    const secret = JWT_ENV.refreshTokenSecret;
    jwt.sign(payload, secret, { expiresIn: "50m" }, (err: any, token: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyAccessToken = async (authHeader: any) => {
  const token = authHeader && authHeader.split(" ")[1];

  return new Promise(function (resolve, reject) {
    jwt.verify(token, JWT_ENV.refreshTokenSecret, (err: any, payload: any) => {
      if (err) {
        reject(err);
      } else {
        return resolve(payload);
      }
    });
  });
};

const getTokenDetails = async (token: string) => {
  const details: TokenDetails = await jwt_decode(token);
  return details;
};

export { signAccessToken, verifyAccessToken, getTokenDetails };

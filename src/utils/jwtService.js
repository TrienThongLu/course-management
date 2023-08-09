import jwt from "jsonwebtoken";
import randtoken from "rand-token";
import { promisify } from "util";
import createHttpError from "http-errors";

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
const tokenLife = process.env.ACCESS_TOKEN_LIFE;

const generateToken = async (userData) => {
  try {
    return await sign(
      {
        userId: userData.id,
      },
      tokenSecret,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    return null;
  }
};

const generateRefreshToken = async (userData) => {
  try {
    const refreshToken = await sign(
      {
        userId: userData.id,
      },
      tokenSecret,
      {
        algorithm: "HS256",
        expiresIn: "60s",
      }
    );
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE)),
    };
    return {
      refreshToken,
      options,
    };
  } catch (error) {
    return null;
  }
};

const verifyToken = async (data) => {
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

  try {
    return await verify(data, tokenSecret);
  } catch (error) {
    return null;
  }
};

const decodeToken = async (data) => {
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

  try {
    return await verify(data, tokenSecret, {
      ignoreExpiration: false,
    });
  } catch (error) {
    return null;
  }
};

const decodeRefreshToken = async (token) => {
  try {
    const rfdata = await verify(token, tokenSecret, {
      ignoreExpiration: false,
    });
    return rfdata;
  } catch (error) {
    return null;
  }
};

export default {
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
  decodeRefreshToken,
};

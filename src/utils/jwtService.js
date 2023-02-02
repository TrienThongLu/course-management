import jwt from "jsonwebtoken";
import randtoken from "rand-token";
import { promisify } from "util";

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const generateToken = async (data) => {
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const tokenLife = process.env.ACCESS_TOKEN_LIFE;

  try {
    return await sign(
      {
        data,
      },
      tokenSecret,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    console.log(`${error}`);
    return null;
  }
};

const generateRefreshToken = async (token) => {
  try {
    const refreshToken = randtoken.generate(token.length * 2);
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE)),
    };
    return {
      refreshToken,
      options,
    };
  } catch (error) {
    console.log(`${error}`);
    return null;
  }
};

const verifyToken = async (data) => {
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

  try {
    return await verify(data, tokenSecret);
  } catch (error) {
    console.log(`${error}`);
    return null;
  }
};

const decodeToken = async (data) => {
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

  try {
    return await verify(data, tokenSecret, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log(`${error}`);
    return null;
  }
};

export default {
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
};

import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (payload: any, secrete: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secrete, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

const verifyToken = (token: string, sectret: Secret) => {
  return jwt.verify(token, sectret) as JwtPayload;
};

export const JwtHelpers = {
  generateToken,
  verifyToken,
};

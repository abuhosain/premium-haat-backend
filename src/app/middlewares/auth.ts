import { NextFunction, Request, Response } from "express";
import { JwtHelpers } from "../helpers/jwtHelpers";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const verifiedUser = JwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      // console.log(verifiedUser);
      req.user = verifiedUser;
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;

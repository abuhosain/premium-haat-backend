import { UserStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { JwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = JwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodeToken;
  try {
    decodeToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret
    );
    // console.log(decodeToken);
  } catch (err) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodeToken?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = JwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    "abcdefg",
    "5m"
  );

  return {
    accessToken,
  };
};

// change password
const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "password change successfully",
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
};

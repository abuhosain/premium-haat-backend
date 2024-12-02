import { UserStatus } from "@prisma/client";
import catchAsynch from "../../../shared/catchAsynch";
import { prisma } from "../../../shared/prisma";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.services";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

const loginUser = catchAsynch(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
});

// refresh token
const refreshToken = catchAsynch(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AccessToken Generate successfully",
    data: result,
  });
});

// change password
const changePassword = catchAsynch(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AuthServices.changePassword(req.user, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "password change successfully",
      data: result,
    });
  }
);

// forget password
const forgotPassword = catchAsynch(async (req, res) => {
  await AuthServices.forgotPassword(req.body);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your email",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};

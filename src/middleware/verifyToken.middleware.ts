import dotenv from 'dotenv'
dotenv.config();
const secret = process.env.SECRETKEY

// Handle Token's
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 *
 * @param {Request} req Original request previous middleware of verification JWT
 * @param {Response} res Original response previous middleware of verification JWT
 * @param {NextFunction} next Next Function
 * @returns Error || Next Function
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check Headers from Request 'x-access-token'
  let token: any = req?.headers["x-access-token"];

  // Verify if exists jwt
  if (!token) {
    return res.status(403).json({
      message: "Not authorized to consume this endpoint",
      authentication: "Token is missing",
    });
  }

  // Check Token obtained
  jwt.verify(token, secret!, (err: any, _: any) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to verify JWT Token",
        authentication: "JWT has failed",
      });
    }

    // JWT OK

    // Pass something to next request

    // Execute Next Function -> Protected Routes will be executed
    next();
  });
  return undefined;
};

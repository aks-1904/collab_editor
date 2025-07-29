import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  id: string;
  email: string;
}

export interface AuthenticationRequest extends Request {
  id?: string;
  email?: string;
}

export const isAuthenticated = async (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization; // Reading token from header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, JWT_SECRET!) as JwtPayload; // Checking for valid token

    // Storing user id and email for further use
    req.id = decode.id;
    req.email = decode.email;

    next();
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: "Invalid Token",
    });
    return;
  }
};

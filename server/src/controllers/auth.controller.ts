import { Request, Response } from "express";
import { mysqlPool } from "../config/db/mysql.js";
import bcrypt from "bcryptjs";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../utils/validators.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: number;
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  // Checking for valid data
  if (!isValidName(name)) {
    res.status(400).json({
      success: false,
      message: "Invalid name",
    });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({
      success: false,
      message: "Invalid Email",
    });
    return;
  }
  if (!isValidPassword(password)) {
    res.status(400).json({
      success: false,
      message:
        "Password should be of minimum 8 Characters, should include 1 uppercase, 1 lowercase, 1 number and 1 special characters",
    });
    return;
  }
  try {
    // Check if user exists
    const [existingUser] = await mysqlPool.execute(
      "SELECT * FROM users where email = ?",
      [email]
    );
    if ((existingUser as any[]).length > 0) {
      res.status(409).json({
        success: false,
        message: "Email already taken",
      });
      return;
    }

    // generating random id
    const id = uuidv4();

    // Hashing password to store in db
    const SALT_VALUE = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_VALUE);

    // Insert new user
    await mysqlPool.execute(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [id, name, email, hashedPassword]
    );

    const token = jwt.sign({ id, email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      token, // Token to store in frontend
      user: {
        id,
        name,
        email,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Couldn't able to create your account, try again later",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Checking for valid data
  if (!isValidEmail(email)) {
    res.status(400).json({
      success: false,
      message: "Invalid email",
    });
    return;
  }

  if (!isValidPassword(password)) {
    res.status(400).json({
      success: false,
      message:
        "Password should be of minimum 8 Characters, should include 1 uppercase, 1 lowercase, 1 number and 1 special characters",
    });
    return;
  }

  try {
    const [rows] = await mysqlPool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const users = rows as any[];

    // User exists
    if (users.length === 0) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Getting user and checking password
    const user: IUser = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Generating token to send to frontend
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token, // Token to store in frontend
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Couldn't able to login, try again later",
    });
    return;
  }
};

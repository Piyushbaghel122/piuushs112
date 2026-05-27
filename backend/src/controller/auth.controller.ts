import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/auth.model";

export default async function login(req: Request, res: Response) {
  try {
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    const existingUser = await AuthModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AuthModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

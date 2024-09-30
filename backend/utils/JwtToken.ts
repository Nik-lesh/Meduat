import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (
  res: Response,
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
  }
): void => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
    },
    process.env.ACCESS_KEY as string,
    {
      expiresIn: "30d",
    }
  );

  // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;

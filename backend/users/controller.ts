import bcrypt from "bcrypt";
import { pool_User } from "../postgrssDB";
import { Request, Response } from "express";
import generateToken from "../utils/JwtToken";

type Props = (req: Request, res: Response) => Promise<any>;

// Register user
//  path  /register

const RegisterUser: Props = async (req, res) => {
  const {
    username,
    password,
    first_name,
    last_name,
    email_id,
    gender,
    date_of_birth,
  } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing the password

    const query = `
      INSERT INTO users (username, password, first_name, last_name, email_id, gender, date_of_birth) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id
    `;

    const result = await pool_User.query(query, [
      username,
      hashedPassword,
      first_name,
      last_name,
      email_id,
      gender,
      date_of_birth,
    ]);

    res.status(201).json({ userId: result.rows[0].id });
    console.log(result.rows[0].id);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Server error while register try again");
  }
};

// login
// path /login

const LoginUser: Props = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be either username or email

  try {
    // Check if identifier is an email or username
    const isEmail = identifier.includes("@");
    const query = isEmail
      ? `SELECT id, password, first_name, last_name, profile_picture FROM users WHERE email_id = $1`
      : `SELECT id, password, first_name, last_name, profile_picture FROM users WHERE username = $1`;

    const result = await pool_User.query(query, [identifier]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    generateToken(res, {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
    });
    res.status(200).json({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
    });
    console.log("login succefull:", user.id, user.first_name, user.last_name);
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).send("Server error while logging try again");
  }
};
const LogoutUser: Props = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    expires: new Date(0), // Immediately expire the cookie
  });

  // Send a response confirming the logout
  res.status(200).json({ message: "User successfully logged out" });
};

export { RegisterUser, LoginUser, LogoutUser };

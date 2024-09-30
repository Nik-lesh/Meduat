import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import { pool_User } from "../../../postgrssDB";

const routeUser = express.Router();

routeUser.get(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      const usersResult = await pool_User.query(
        "SELECT id, username, profile_picture FROM users"
      );
      res.json(usersResult.rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);
export default routeUser;

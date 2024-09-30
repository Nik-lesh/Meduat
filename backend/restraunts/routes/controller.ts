import { pool_Restraunt, pool_User } from "../../postgrssDB";
import { Request, Response } from "express";

type Props = (req: Request, res: Response) => Promise<any>;

const getRestraunt: Props = async (req, res) => {
  pool_User.query("SELECT * FROM restraunt", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getRestrauntById: Props = async (req, res) => {
  const { id, type } = req.params;

  try {
    let entityResult;
    let reviewsResult;

    // Fetch details based on type
    if (type === "restaurant") {
      entityResult = await pool_User.query(
        `SELECT * FROM restraunt WHERE id = $1`,
        [id]
      );
    } else if (type === "hotel") {
      entityResult = await pool_User.query(
        `SELECT * FROM hotel WHERE id = $1`,
        [id]
      );
    } else {
      return res.status(400).json({ message: "Invalid type provided" });
    }

    // Check if the entity exists
    if (entityResult.rows.length === 0) {
      return res.status(404).json({
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`,
      });
    }

    const entityDetails = entityResult.rows[0];

    // Fetch reviews
    if (type === "restaurant") {
      reviewsResult = await pool_User.query(
        `SELECT r.review_text, r.rating, r.image, r.user_id, u.username, u.profile_picture
   FROM reviews r
   JOIN users u ON r.user_id = u.id
   WHERE r.restaurant_id = $1`,
        [id]
      );
    } else if (type === "hotel") {
      reviewsResult = await pool_User.query(
        `SELECT review_text, rating, image FROM reviews WHERE hotel_id = $1`,
        [id]
      );
    }

    const reviews = reviewsResult ? reviewsResult.rows : [];

    // Combine and send response
    const response = {
      ...entityDetails,
      reviews: reviews,
    };

    res.json(response);
  } catch (err) {
    console.error("Error querying:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const PostReview: Props = async (req, res) => {
  const { user_id, review_text, rating } = req.body;
  const { type, id } = req.params;

  let imageUrl: string | undefined = undefined;
  if (req.file) {
    if (type === "restaurant") {
      // Correct spelling
      imageUrl = `/Restraunt/${req.file.filename}`;
    } else if (type === "hotel") {
      imageUrl = `/Restraunt/hotels/${req.file.filename}`;
    }
  }

  if (!type || (type !== "restaurant" && type !== "hotel")) {
    return res.status(400).json({
      error: 'Invalid review type. Must be "restaurant" or "hotel".',
    });
  }

  try {
    // Declare variables for query and values
    let query: string = "";
    let values: (string | number)[] = [];

    if (type === "restaurant") {
      query = `INSERT INTO reviews (user_id, restaurant_id, review_text, image, rating)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING *`;
      values = [user_id, id, review_text, imageUrl || "", rating];
    } else if (type === "hotel") {
      query = `INSERT INTO reviews (user_id, hotel_id, review_text, image, rating)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING *`;
      values = [user_id, id, review_text, imageUrl || "", rating];
    }

    // Insert the review into the appropriate table
    const result = await pool_User.query(query, values);

    // Return the inserted review as a response
    res.status(201).json(result.rows[0]);
    console.log(result);
  } catch (error) {
    console.error("Error inserting review:", error);
    res
      .status(500)
      .json({ error: "An error occurred while posting the review." });
  }
};

export { getRestraunt, getRestrauntById, PostReview };

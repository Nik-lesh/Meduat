import { pool_Hotel, pool_User } from "../../../postgrssDB";
import { Request, Response } from "express";

type Props = (req: Request, res: Response) => Promise<any>;

const getHotel: Props = async (req, res) => {
  pool_User.query("SELECT * FROM hotel", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
export default getHotel;

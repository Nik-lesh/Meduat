import { Request, Response, NextFunction } from "express";

type Props = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler =
  (fn: Props) => (req: Request, res: Response, next: NextFunction) => {
    // Wraps the function in a promise fir error ko log
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error("Error caught by asyncHandler:", err);
      next(err);
    });
  };

export default asyncHandler;

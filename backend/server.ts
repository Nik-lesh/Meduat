import express from "express";
import cors from "cors";
import connectDB from "./movies/db/databaseConnect";
import dotenv from "dotenv";
import route from "./movies/routes/routes";
import routeRestraunt from "./restraunts/routes/routes";
import { RegisterUser, LoginUser, LogoutUser } from "./users/controller";
import routeUser from "./movies/routes/users/users";
import routeHotel from "./restraunts/hotels/routes/routes";
dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/register", RegisterUser);
app.post("/login", LoginUser);
app.post("/logout", LogoutUser);

app.use("/details", route); // movie tv show route
app.use("/", routeUser); // user route just for movies just

// now user route for particular user define is remaining  will do it later

app.use("/", routeRestraunt); // this one is specificly for restraunt hotels ka badme dekhte h hai

app.use("/hotels", routeHotel); // this one is specificly for restraunt hotels ka badme dekhte h hai

app.listen(port, () => [console.log(`Server running on port ${port}`)]);

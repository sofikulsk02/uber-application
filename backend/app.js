const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoute = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(cookieParser());
connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/users", userRoute);
app.use("/captains", captainRoutes);
app.listen(process.env.PORT, () => {
  console.log(`the server has started at port:${process.env.PORT}`);
});

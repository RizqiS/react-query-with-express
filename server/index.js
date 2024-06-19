if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
/* connect to mongodb */
mongoose.connect(process.env.DATABASE_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use(cors());
app.use(express.json());
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

/* configure router */
const blogRouter = require("./routes/blog");
app.use("/blog", blogRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("server running is http://locahost:8080");
});

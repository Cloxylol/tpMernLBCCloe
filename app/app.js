const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());

const PORT = 8080;

dotenv.config();

app.use(cors({ origin: "*" }));

mongoose
  .connect("mongodb://localhost:27017/tpleboncoin", {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

app.use("/users", require("./Routes/userRoutes"));
app.use("/annonces", require("./Routes/annonceRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

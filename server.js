const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongodb_URI =
  "mongodb+srv://CLEscherich:pass`1234@cluster0.bxr7x.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

mongoose.connect(mongodb_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.use(require("./routes/api.js"));

app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
const mongoURI = process.env.MongoDB_ID;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const user = "";

// Define User and Address schemas
const User = require("./model/User");
const Address = require("./model/Address");

app.get("/", (req, res) => {
  // Read the content of the index.html file
  fs.readFile("index.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading index.html");
    } else {
      res.send(data);
    }
  });
});

app.post("/user", async (req, res) => {
  try {
    const { name, address } = req.body;

    // Create a new user
    const user = new User({ name });
    await user.save();

    // Create a new address
    const userAddress = new Address({ user: user._id, address });
    await userAddress.save();

    res.status(201);
    res.send(
      '<p><center style="font-weight: bold; font-size: 2em;color: green;">Submitted</center></p>'
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

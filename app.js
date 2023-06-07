const express = require("express");
const mongoose = require("mongoose");
const Voters = require("./model/practiceModel");

const app = express();
const port = process.env.PORT || 5050;

app.set("view engine", "ejs");
require("dotenv").config();

const DB_URL = process.env.DATABASE_URL;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/add-voter", async (req, res) => {
  const VOTERS = new Voters({
    name: "Clark Kent",
    party: "Independent",
    candidate: "George Washington",
  });
  VOTERS.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", async (req, res) => {
  try {
    const allVoters = await Voters.find();
    res.render("index", { title: "EJS Home Page", voters: allVoters });
  } catch (err) {
    console.log(err);
  }
});

app.get("/about", (req, res) => {
  res.render("about", { title: "EJS About Page" });
});

app.post("/", (req, res) => {
  const savedVoter = new Voters(req.body);
  savedVoter
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/create", (req, res) => {
  res.status(200).render("createList", { title: "EJS Create Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "EJS Error" });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

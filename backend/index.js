const PORT = 8000;

const express = require("express");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://amrin:tinder-12345@cluster0.9bbug.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/signup", (req, res) => {
  res.json("signup");
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnUsers = await users.find().toArray();
    res.send(returnUsers);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log(`Server running port ${PORT}`));

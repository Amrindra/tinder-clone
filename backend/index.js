const PORT = 8000;

const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const uri =
  "mongodb+srv://amrin:tinder-12345@cluster0.9bbug.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);

  // accessing and extracting the email and password from the frontend by using using req.body
  const { email, password } = req.body;

  // using uuid to generate a unique user id
  const generatedUserId = uuidv4();

  //Hashing password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  //Sending over to the database
  try {
    await client.connect();
    //app-data and users are from the database collection
    const database = client.db("app-data");
    const users = database.collection("users");

    //Checking by email to see if the user is already exist if it exists we don't want to sign up again
    const existingUser = users.findOne({ email });

    //if the user alerady exist inform the user to login instead
    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    //To convert email to lowercase when saving to the database
    const sanitizedEmail = email.toLowerCase();

    //Asigning data to the users collection in the database then will insert it to the database
    const data = {
      //make sure we make (properties) it the same exaclty to the ones in the database
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    //Inserting data to the users document in the database
    const inseretedUser = await users.insertOne(data);
  } catch (error) {}
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

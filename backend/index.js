const PORT = 8000;

const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://amrin:tinder-12345@cluster0.9bbug.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);

  // accessing and extracting the email and password from the frontend by using using req.body
  const { email, password } = req.body;
  // console.log(req.body);

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

    //Checking by email to see if the user is already exist if it exists don't sign this user up again
    const existingUser = await users.findOne({ email });

    //if the user alerady existed inform the user to login instead
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

    //Generating web token
    const token = jwt.sign(inseretedUser, sanitizedEmail, {
      //Setting token to be expired in 24 hours
      expiresIn: 60 * 24,
    });

    //Sending back the status code, token, userId, and email to the frontend/client side that being fetched by axios
    res
      .status(201)
      .json({ token, userId: generatedUserId, email: sanitizedEmail });
  } catch (error) {
    console.log(error);
  }
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

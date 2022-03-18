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

    //Checking by email to see if the user is already exist if a user exists don't let this user sign up again
    const existingUser = await users.findOne({ email });

    //if the user alerady existed inform the user to login instead
    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    //To convert email to lowercase when saving to the database
    const sanitizedEmail = email.toLowerCase();

    //Asigning data to the users collection in the database then will insert them to the database
    const data = {
      //make sure we provide properties name the same exaclty to the ones in database
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    //Inserting data to the users document in the database. This meaning that when a user sign up an account it will save in database
    const inseretedUser = await users.insertOne(data);

    //Generating web token
    const token = jwt.sign(inseretedUser, sanitizedEmail, {
      //Setting token to be expired in 24 hours
      expiresIn: 60 * 24,
    });

    //Sending back the status code and token to the frontend/client side that being fetched by axios
    res.status(201).json({ token, userId: generatedUserId });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    //Find a user by email
    const user = await users.findOne({ email });

    //bcrypt.compare is used to compare between passord that user typed in with hashed_password in database to if both passwords match/correct
    const correctedPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    //Check to see if a user exists and password that user typed in is correct with the user.hashed_password that stores in database
    //if both passwords match/correct then create a new token
    if (user && correctedPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });

      //Now both passwords are match, so send back token and userId as json file
      res.status(201).json({ token, userId: user.user_id });
    }

    //Otherwise, password is incorrect, so send back the invalid password message
    res.status(400).send("Invalid Password!");
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

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

//The following route will happen when a user submits a form from onboarding page
app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    // Looking for user from formData.user_id that just saved from the cookies
    const query = { user_id: formData.user_id };
    //Udating user information
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);
    res.send(insertedUser);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log(`Server running port ${PORT}`));

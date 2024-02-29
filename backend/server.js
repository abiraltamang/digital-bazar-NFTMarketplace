import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import { readFileSync, unlinkSync } from "fs";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nftmarketplace",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Define endpoint for inserting data
app.post("/insert", (req, res) => {
  const { username, email, wallet_address, bio, social_networks } = req.body;

  // Ensure that username, email, and wallet_address are provided
  if (!username || !email || !wallet_address) {
    return res
      .status(400)
      .json({ error: "Username, email, and wallet address are required" });
  }

  // Check if the user with the provided wallet address already exists in the database
  const checkUserSql = "SELECT * FROM users WHERE wallet_address = ?";
  con.query(checkUserSql, [wallet_address], (err, result) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ error: "Error checking user" });
    }

    if (result.length > 0) {
      // User already exists, return a response indicating that the user already exists
      return res.status(400).json({ error: "User already exists" });
    } else {
      // User does not exist, insert a new record into the database
      const insertSql =
        "INSERT INTO users (username, email, wallet_address, bio, social_networks) VALUES (?, ?, ?, ?, ?)";
      const values = [
        username,
        email,
        wallet_address,
        bio || null,
        social_networks || null,
      ];

      con.query(insertSql, values, (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ error: "Error inserting data" });
        }
        console.log("Number of records inserted: " + result.affectedRows);
        return res.status(200).json({ message: "Data inserted successfully" });
      });
    }
  });
});

app.post("/user", (req, res) => {
  const { wallet_address } = req.body;

  // Query the database to fetch user information based on the provided wallet address
  const sql = "SELECT * FROM users WHERE wallet_address = ?";
  con.query(sql, [wallet_address], (err, result) => {
    if (err) {
      console.error("Error fetching user information:", err);
      return res.status(500).json({ error: "Error fetching user information" });
    }

    if (result.length === 0) {
      // If no user found with the provided wallet address, return a 404 error
      return res.status(404).json({ error: "User not found" });
    }

    // User found, return the user information
    const user = result[0];
    res.status(200).json(user);
  });
});

// Update profile endpoint
app.post("/update-profile", upload.single("image"), async (req, res) => {
  try {
    const { wallet_address, username, email, bio, socialNetworks } = req.body;

    let imageUrl = null; // Initialize imageUrl variable

    // Check if an image file was uploaded
    if (req.file) {
      const image = readFileSync(req.file.path);
      const updateImageSql =
        "UPDATE users SET image = ? WHERE wallet_address = ?";
      await con.query(updateImageSql, [image, wallet_address]);
      imageUrl = `/image/${wallet_address}`; // Set imageUrl to the endpoint to retrieve the image
      unlinkSync(req.file.path); // Remove the uploaded file after insertion
    }

    // Construct the SQL query to update the user profile
    const updateProfileSql = `
      UPDATE users
      SET 
        username = ?,
        email = ?,
        bio = ?,
        social_networks = ?
      WHERE
        wallet_address = ?
    `;

    // Execute the query with the provided data
    await con.query(updateProfileSql, [
      username,
      email,
      bio,
      socialNetworks,
      wallet_address,
    ]);

    // Check if any rows were affected by the update
    if (con.rowsAffected === 0) {
      res.status(404).send("User not found");
    } else {
      res
        .status(200)
        .json({ message: "Profile updated successfully", imageUrl });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal server error");
  }
});

// Upload image endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  const { wallet_address } = req.body;
  const image = readFileSync(req.file.path);
  const sql = "UPDATE users SET image = ? WHERE wallet_address = ?";
  con.query(sql, [image, wallet_address], (err, result) => {
    if (err) {
      console.error("Error updating image:", err);
      return res.status(500).json({ error: "Error updating image" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Image updated successfully");
    unlinkSync(req.file.path); // Remove the uploaded file after insertion
    return res.status(200).json({ message: "Image updated successfully" });
  });
});

// Retrieve image endpoint
app.get("/image/:walletAddress", (req, res) => {
  const { walletAddress } = req.params;
  const sql = "SELECT image FROM users WHERE wallet_address = ?";
  con.query(sql, [walletAddress], (err, result) => {
    if (err) {
      console.error("Error fetching image:", err);
      return res.status(500).json({ error: "Error fetching image" });
    }
    if (result.length === 0 || !result[0].image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(result[0].image, "binary");
  });
});

app.listen(8000, () => {
  console.log("Server running at https://localhost:8000");
});

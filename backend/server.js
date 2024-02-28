import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
app.put('/update-profile', async (req, res) => {
    try {
        const { wallet_address, username, email, bio, socialNetworks } = req.body;

        // Construct the SQL query to update the user profile
        const query = `
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
        await con.query(query, [username, email, bio, socialNetworks, wallet_address]);

        // Check if any rows were affected by the update
        if (con.rowsAffected === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('Profile updated successfully');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal server error');
    }
});

  

app.listen(8000, () => {
  console.log("Server running at https://localhost:8000");
});

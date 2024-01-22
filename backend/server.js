// Module Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

// Enable express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parses incoming json payloads

// SQL connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ============== END POINTS =================//

// API: ROOT Endpoint
app.get("/", (req, res) => {
  res.send("Hey backend is running yoooooo~😉");
});

// API: LOGIN Endpoint
// Login Endpoint which retrieves the team mate data from team_mate table
app.post("/api/login", (req, res) => {
  console.log("/api/login endpoint was hit 🎯");
  console.log(req.body); // e.g { email: "billy@thegoat.co.nz", password: "billy123"}

  const email = req.body.email; // "billy@thegoat.co.nz"
  const password = req.body.password; // "billy123"
  const query = `SELECT id, name, email, password FROM team_mate.team_mate WHERE email = ? AND password = ?;`; // parameterized query to prevent SQL injection

  pool.execute(query, [email, password], (err, result) => {

    // HANDLING THE ERROR
    if (err) {
      console.log(err);
    }

    // HANDLING THE RESULT:
    // If it was successful we will get back an array with the data e.g. [{id: 1, name: "Billy", email: "Billy@thegoat.co.nz", password: "billy123"}]
    // If it was unsuccessful we will get back an empty array, which has a length of 0 - this is how we can choose what status to send back
    if (result.length === 0) {
      res.sendStatus(404); // e.g Not Found
    } else if (result.length >= 1) {
      res.sendStatus(200); // e.g. Success
    }
    console.log(result);
  });
});

// =================== PORT ================= //
const port = process.env.PORT;

app
  .listen(port, () => {
    console.log(`It's working yo, at http://localhost:${port}`);
  })
  .on("error", (error) => console.log(error));

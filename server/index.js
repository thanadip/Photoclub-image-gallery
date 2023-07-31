import express from "express";
import mysql from "mysql";
import cors from "cors";

const port = 5001;

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gallery",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected successfully');
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend ");
});

app.get("/user", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/register', async (req, res) => {
  try {
    const { username, user_email, password } = req.body;

    // Check if the email already exists
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE user_email = ?', [user_email], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Save the user information to the database
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, user_email, password) VALUES (?, ?, ?)', [username, user_email, password], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log("Backend connected");
});

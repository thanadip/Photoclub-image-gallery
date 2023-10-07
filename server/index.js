const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
// const Cookies = require('js-cookie');

const port = 5001;

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gallery",
  connectTimeout: 20000,
  multipleStatements: true,
  charset: "utf8mb4",
  bigNumberStrings: true,
  dateStrings: true,
  supportBigNumbers: true,
  typeCast: true,
  maxAllowedPacket: 100 * 1024 * 1024,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Database connected successfully");
});

app.listen(port, () => {
  console.log("Backend connected");
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend ");
});

function generateToken(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "secret_key",
    { expiresIn: "1h" }
  );
  return token;
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });

    if (existingUser.length === 0) {
      return res.status(401).json({ message: "Invalid inputs" });
    }

    const storedPassword = existingUser[0].password;
    bcrypt.compare(password, storedPassword, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Invalid inputs" });
      }

      const user = {
        id: existingUser[0].id,
        username: existingUser[0].username,
        user_email: existingUser[0].user_email,
        password: existingUser[0].password,
        user_phone: existingUser[0].user_phone,
        user_type_id: existingUser[0].user_type_id,
      };
      const token = generateToken(user);
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user_type_id: user.user_type_id,
        username: user.username,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, user_email, password } = req.body;

    if (!username || !user_email || !password) {
      return res.status(400).json({ message: "missing required field" });
    }

    // Check if the email already exists
    const existingUser = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE user_email = ?",
        [user_email],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while hashing password" });
      }

      // Save the user information (including the hashed password) to the database
      await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO users (username, user_email, password) VALUES (?, ?, ?)",
          [username, user_email, hashedPassword],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      res.status(201).json({ message: "Registration successful" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const allUser = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/users/:userId", async (req, res) => {
  const userID = req.params.userId;
  const sql = "DELETE FROM users WHERE user_id = ?";

  try {
    db.query(sql, [userID], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/users/:userId", async (req, res) => {
  const userID = req.params.userId;
  const userType = req.body.user_type_id;

  const sql = "UPDATE users SET user_type_id = ? WHERE user_id = ?";

  try {
    db.query(sql, [userType, userID], (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User updated successfully" });
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 30 * 1024 * 1024 } });

app.post("/upload-images", upload.array("images"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images included" });
    }

    const folderId = req.header("X-Folder-ID");

    const insertedImages = req.files.map((image) => {
      const image_data = image.buffer;
      const insertQuery =
        "INSERT INTO pictures (pic_name , folder_id) VALUES (?, ?)";
      const insertValues = [image_data, folderId];
      return new Promise((resolve, reject) => {
        db.query(insertQuery, insertValues, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    await Promise.all(insertedImages);

    res.status(201).json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/display-images", async (req, res) => {
  try {
    db.query("SELECT pic_name FROM pictures", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const images = results.map((row) => ({
        pic_name: row.pic_name.toString("base64"),
      }));
      res.status(200).json(images);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-folder", async (req, res) => {
  try {
    db.query("SELECT * FROM picture_folder", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-year", async (req, res) => {
  try {
    db.query("SELECT * FROM years", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/add-year", async (req, res) => {
  try {
    const { year_name } = req.body;

    if (!year_name) {
      return res.status(400).json({ message: "Missing required field" });
    }

    db.query(
      "SELECT * FROM years WHERE year_name = ?",
      [year_name],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
          return res.status(409).json({ message: "Year already exists" });
        } else {
          db.query(
            "INSERT INTO years(year_name) VALUES (?)",
            [year_name],
            (err, insertResults) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }

              res.status(200).json(insertResults);
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/add-folder", async (req, res) => {
  try {
    const { folder_name, year_id } = req.body;

    if (!folder_name || !year_id) {
      return res.status(400).json({ message: "missing required field" });
    }

    db.query(
      "INSERT INTO picture_folder (folder_name , year_id) VALUES (? ,?)",
      [folder_name, year_id],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-folders/:yearId", async (req, res) => {
  try {
    const yearId = req.params.yearId;

    db.query(
      "SELECT * FROM picture_folder WHERE year_id = ? AND folder_status = 1",
      [yearId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-images/:folderId", async (req, res) => {
  try {
    const folderId = req.params.folderId;

    db.query(
      "SELECT pic_name FROM pictures WHERE folder_id = ?",
      [folderId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        const images = results.map((row) => ({
          pic_name: row.pic_name.toString("base64"),
        }));
        res.status(200).json(images);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get-thumbnail/:folderId", async (req, res) => {
  try {
    const folderId = req.params.folderId;

    db.query(
      "SELECT pic_name FROM pictures WHERE folder_id = ? LIMIT 1",
      [folderId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "No images in the folder" });
        }

        const firstImage = result[0].pic_name.toString("base64");
        res.status(200).json({ firstImage });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/folder/:folderId", async (req, res) => {
  const folderID = req.params.folderId;
  const sql = "DELETE FROM picture_folder WHERE folder_id = ?";
  try {
    db.query(sql, [folderID], (err, result) => {
      if (err) {
        console.error("Error deleting folder:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Folder not found" });
      }

      return res.status(200).json({ message: "Folder delete successfully" });
    });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/folder/:folderId", async (req, res) => {
  const folderID = req.params.folderId;
  const folderStatus = req.body.folder_status;
  const sql = "UPDATE picture_folder SET folder_status = ? WHERE folder_id = ?";

  try {
    db.query(sql, [folderStatus, folderID], (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500, json({ message: "Internal server error" }));
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Folder not found" });
      }

      return res.status(200).json({ message: "Status updated successfully" });
    });
  } catch (error) {
    console.error("Error updating folder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/years/:yearId", async (req, res) => {
  const sql = "DELETE FROM years WHERE year_id = ?";
  const yearID = req.params.yearId;

  try {
    db.query(sql, [yearID], (err, result) => {
      if (err) {
        console.error("Error deleting year:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Year not found" });
      }

      return res.status(200).json({ message: "Year deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting year:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/image/:imageId", async (req, res) => {
  const sql = "DELETE FROM pictures WHERE pic_id = ?";
  const imageID = req.params.imageId;

  try {
    db.query(sql, [imageID], (err, result) => {
      if (err) {
        console.error("Error deleting image:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Image not found" });
      }

      return res.status(200).json({ message: "Image deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/folder/:folderId", async (req, res) => {
  const folderID = req.params.folderId;
  const newFolderName = req.body.newFolderName;

  const sql = "UPDATE picture_folder SET folder_name = ? WHERE folder_id = ?";

  try {
    db.query(sql, [newFolderName, folderID], (err, result) => {
      if (err) {
        console.error("Error updating folder name:", err);
        return res.status(500).json({ message: "Internal server error " });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Folder not found " });
      }

      return res.status(200).json({ message: "Folder updating successfully" });
    });
  } catch (error) {
    console.error("Error updating folder name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/years/:yearId", async (req, res) => {
  const yearID = req.params.yearId;
  const yearName = req.body.yearName;
  const sql = "UPDATE years SET year_name = ? WHERE year_id = ?";

  try {
    db.query(sql, [yearName, yearID], (err, result) => {
      if (err) {
        console.error("Error updating year name:", err);
        return res.status(500).json({ message: "Internal server error " });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Year not found " });
      }

      return res.status(200).json({ message: "Year updating successfully" });
    });
  } catch (error) {
    console.error("Error updating year name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

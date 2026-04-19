const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120
}));

// 🔗 MONGO
mongoose.connect("mongodb+srv://Pedro:Orca1234@cluster0.lk9kiqy.mongodb.net/?appName=Cluster0");

// 👤 USER
const User = mongoose.model("User", {
  username: String,
  password: String,
  role: { type: String, default: "user" }
});

const SECRET = "saas-secret";

// 🔐 REGISTER
app.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  await User.create({
    username: req.body.username,
    password: hash
  });

  res.json({ ok: true });
});

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ error: "erro" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(400).json({ error: "erro" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});

// 🛡️ AUTH
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

// 🔒 DASHBOARD
app.get("/dashboard", auth, (req, res) => {
  res.send("Dashboard OK 🚀");
});

// 🏠 HOME
app.get("/", (req, res) => {
  res.send("Block Jogos ONLINE 🚀");
});

app.listen(3000);
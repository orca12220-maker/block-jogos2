const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 CONEXÃO MONGODB
mongoose.connect("mongodb+srv://Pedro:Orca1234@cluster0.lk9kiqy.mongodb.net/?appName=Cluster0");

mongoose.connection.on("connected", () => {
  console.log("MongoDB conectado 🚀");
});

// 🧠 MODELO DE USUÁRIO
const User = mongoose.model("User", {
  username: String,
  password: String
});

// 🔐 REGISTRO
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "Usuário criado" });
});

// 🔐 LOGIN (simples por enquanto)
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(400).json({ error: "Inválido" });

  res.json({ message: "Login OK 🚀" });
});

// 🧪 TESTE
app.get("/", (req, res) => {
  res.send("Block Jogos ONLINE 🚀");
});

// PORTA RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando");
});
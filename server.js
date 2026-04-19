const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = [];
const SECRET = "block-secret";

// 🔹 PÁGINA LOGIN (FRONTEND DENTRO DO BACKEND)
app.get("/", (req, res) => {
  res.send(`
  <html>
  <body style="font-family:sans-serif;text-align:center;background:#111;color:white">

    <h1>Block Jogos LOGIN</h1>

    <form method="POST" action="/login">
      <input name="username" placeholder="usuário"><br><br>
      <input name="password" type="password" placeholder="senha"><br><br>
      <button type="submit">Entrar</button>
    </form>

  </body>
  </html>
  `);
});

// 🔹 LOGIN REAL
app.post("/login", express.urlencoded({ extended: true }), async (req, res) => {
  const { username, password } = req.body;

  let user = users.find(u => u.username === username);

  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    users.push({ username, password: hash });
    user = { username, password: hash };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Senha errada");

  const token = jwt.sign({ username }, SECRET, { expiresIn: "2h" });

  res.send(`
    <h2>Logado com sucesso 🚀</h2>
    <p>Token: ${token}</p>
    <a href="/">voltar</a>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
app.get("/dashboard", (req, res) => {
  res.send(`
    <h1>Dashboard Block Jogos 🚀</h1>
    <p>Você está logado (teste simples)</p>
  `);
});
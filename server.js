const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// “banco de dados” simples (depois trocamos por MongoDB)
const users = [];

// CHAVE DO TOKEN (depois a gente melhora isso)
const SECRET = "block-jogos-secret";

// REGISTRO
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  users.push({
    username,
    password: hash
  });

  res.json({ message: "Usuário criado com sucesso" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Usuário não existe" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Senha inválida" });

  const token = jwt.sign({ username }, SECRET, { expiresIn: "2h" });

  res.json({ token });
});

// ROTA PROTEGIDA (teste)
app.get("/dashboard", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ error: "Sem token" });

  try {
    const decoded = jwt.verify(auth.split(" ")[1], SECRET);
    res.json({ message: "Bem-vindo " + decoded.username });
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
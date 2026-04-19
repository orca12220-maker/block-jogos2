const express = require("express");
const app = express();

app.use(express.json());

// ROTA PRINCIPAL (OBRIGATÓRIA)
app.get("/", (req, res) => {
  res.send("Block Jogos ONLINE 🚀");
});

// TESTE LOGIN (se já tiver)
app.post("/login", (req, res) => {
  res.send("login ok");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Rodando na porta " + PORT);
});
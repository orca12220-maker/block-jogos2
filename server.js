const express = require("express");
const app = express();

app.use(express.json());

// ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.send("Block Jogos ONLINE 🚀");
});

// TESTE DE PRODUTOS (exemplo futuro da loja)
app.get("/products", (req, res) => {
  res.json([
    { id: 1, nome: "Item 1", preco: 10 },
    { id: 2, nome: "Item 2", preco: 20 }
  ]);
});

// PORTA DO RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
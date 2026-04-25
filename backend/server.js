const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const chatRoutes = require("./routes/chat");
const dialogflowRoutes = require("../dialogflow/webhook");

app.use("/api/chat", chatRoutes);
app.use("/api/dialogflow", dialogflowRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Servidor do chatbot rodando!" });
});

app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err.message);
  res.status(500).json({ error: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
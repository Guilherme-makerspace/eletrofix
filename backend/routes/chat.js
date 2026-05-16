const express = require("express");
const router = express.Router();
const { askOllama } = require("../services/ollama");
const { retrieve } = require("../../rag/retriever");

const conversationMemory = {};
const TTL_MS = 30 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  let removidas = 0;

  for (const sessionId in conversationMemory) {
    const session = conversationMemory[sessionId];
    if (now - session.lastActivity > TTL_MS) {
      delete conversationMemory[sessionId];
      removidas++;
    }
  }

  if (removidas > 0) {
    console.log(`[TTL] ${removidas} sessão(ões) expirada(s) removida(s).`);
  }
}, 10 * 60 * 1000);

router.post("/", async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "O campo 'message' é obrigatório." });
  }

  if (!sessionId) {
    return res.status(400).json({ error: "O campo 'sessionId' é obrigatório." });
  }

  try {
    if (!conversationMemory[sessionId]) {
      conversationMemory[sessionId] = {
        history: [],
        lastActivity: Date.now(),
      };
    }

    conversationMemory[sessionId].lastActivity = Date.now();

    const context = retrieve(message);
    const history = conversationMemory[sessionId].history;

    // sessionId passado corretamente dentro da função async
    const reply = await askOllama(message, context, history, sessionId);

    conversationMemory[sessionId].history.push(
      { role: "user", content: message },
      { role: "assistant", content: reply }
    );

    return res.json({ reply, ragUsed: context !== null });

  } catch (error) {
    console.error("Erro na rota /chat:", error.message);
    return res.status(500).json({ error: "Não foi possível processar sua mensagem." });
  }
});

router.delete("/memory/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  delete conversationMemory[sessionId];
  return res.json({ message: "Memória limpa com sucesso." });
});

module.exports = router;
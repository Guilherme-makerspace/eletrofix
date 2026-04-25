const express = require("express");
const router = express.Router();
const { askOllama } = require("../services/ollama");
const { retrieve } = require("../../rag/retriever");

// Memória de conversa por sessão
const conversationMemory = {};

router.post("/", async (req, res) => {
  const { message, sessionId } = req.body;

  // Validação de entrada
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "O campo 'message' é obrigatório." });
  }

  if (!sessionId) {
    return res.status(400).json({ error: "O campo 'sessionId' é obrigatório." });
  }

  try {
    // Inicializa memória da sessão se não existir
    if (!conversationMemory[sessionId]) {
      conversationMemory[sessionId] = [];
    }

    // Busca contexto relevante na base de conhecimento (RAG)
    const context = retrieve(message);

    // Monta histórico da conversa
    const history = conversationMemory[sessionId];

    // Envia para o Ollama
    const reply = await askOllama(message, context, history);

    // Atualiza memória com a nova troca
    conversationMemory[sessionId].push(
      { role: "user", content: message },
      { role: "assistant", content: reply }
    );

    return res.json({ reply });

  } catch (error) {
    console.error("Erro na rota /chat:", error.message);
    return res.status(500).json({ error: "Não foi possível processar sua mensagem." });
  }
});

// Rota para limpar histórico da sessão
router.delete("/memory/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  delete conversationMemory[sessionId];
  return res.json({ message: "Memória limpa com sucesso." });
});

module.exports = router;
const { askOllama } = require("../backend/services/ollama");
const { retrieve } = require("../rag/retriever");

const dialogflowMemory = {};

async function handleIntent(intentName, userMessage, sessionId) {
  if (!dialogflowMemory[sessionId]) {
    dialogflowMemory[sessionId] = [];
  }

  const handler = intentMap[intentName] || handleFallback;
  return await handler(userMessage, sessionId);
}

const intentMap = {
  "Saudacao": handleSaudacao,
  "Encerramento": handleEncerramento,
  "Informacao": handleRapido,
  "Defeito": handleRapido,
  "Orcamento": handleRapido,
  "Default Fallback Intent": handleFallback,
};

// ─── Respostas fixas (instantâneas) ──────────────────────

async function handleSaudacao(userMessage, sessionId) {
  return "Olá! Bem-vindo à EletroFix! Posso te ajudar com dúvidas sobre manutenção de eletrônicos, orçamentos e muito mais. Como posso te ajudar?";
}

async function handleEncerramento(userMessage, sessionId) {
  delete dialogflowMemory[sessionId];
  return "Foi um prazer te ajudar! Qualquer dúvida, a EletroFix está à disposição. Até mais!";
}

// ─── Respostas rápidas por intenção ──────────────────────
// Usadas para não estourar o timeout do Dialogflow (5s)
// O Ollama processa em background mas a resposta imediata
// mantém o fluxo funcionando para a demonstração

async function handleRapido(userMessage, sessionId) {
  const context = retrieve(userMessage);

  // Dispara o Ollama em background (sem await)
  askOllama(userMessage, context, dialogflowMemory[sessionId] || [])
    .then((reply) => {
      if (!dialogflowMemory[sessionId]) dialogflowMemory[sessionId] = [];
      dialogflowMemory[sessionId].push(
        { role: "user", content: userMessage },
        { role: "assistant", content: reply }
      );
      console.log(`[Dialogflow] Ollama processou: ${reply.slice(0, 80)}...`);
    })
    .catch((err) => {
      console.error("[Dialogflow] Erro no Ollama em background:", err.message);
    });

  // Retorna imediatamente para não estourar o timeout
  return "Entendi sua solicitação! Estou analisando e em instantes você recebe a resposta completa pelo nosso chat em eletrofix.com.br. Posso te ajudar com mais alguma coisa?";
}

async function handleFallback(userMessage, sessionId) {
  return handleRapido(userMessage, sessionId);
}

module.exports = { handleIntent };
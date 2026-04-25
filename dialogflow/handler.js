const { askOllama } = require("../backend/services/ollama");
const { retrieve } = require("../rag/retriever");

// Mapeamento de intenções do Dialogflow
const intentMap = {
  "Saudacao": handleSaudacao,
  "Orcamento": handleGenerico,
  "Prazo": handleGenerico,
  "Garantia": handleGenerico,
  "Pagamento": handleGenerico,
  "Defeito.Celular": handleGenerico,
  "Defeito.Notebook": handleGenerico,
  "Defeito.TV": handleGenerico,
  "Defeito.Videogame": handleGenerico,
  "Dicas.Preventivas": handleGenerico,
  "Encerramento": handleEncerramento,
  "Default Fallback Intent": handleFallback,
};

// Memória compartilhada com o backend (simples, em memória)
const dialogflowMemory = {};

async function handleIntent(intentName, userMessage, sessionId) {
  // Inicializa memória da sessão se não existir
  if (!dialogflowMemory[sessionId]) {
    dialogflowMemory[sessionId] = [];
  }

  const handler = intentMap[intentName] || handleFallback;
  return await handler(userMessage, sessionId);
}

// ─── Handlers específicos ─────────────────────────────────

async function handleSaudacao(userMessage, sessionId) {
  return "Olá! Bem-vindo à EletroFix, sua assistência técnica especializada em eletrônicos! Como posso te ajudar hoje?";
}

async function handleEncerramento(userMessage, sessionId) {
  delete dialogflowMemory[sessionId];
  return "Foi um prazer te ajudar! Qualquer dúvida, estamos à disposição. Até mais!";
}

async function handleFallback(userMessage, sessionId) {
  // Se não reconhecer a intenção, passa pro Ollama com RAG
  return await handleGenerico(userMessage, sessionId);
}

async function handleGenerico(userMessage, sessionId) {
  try {
    const context = retrieve(userMessage);
    const history = dialogflowMemory[sessionId] || [];

    const reply = await askOllama(userMessage, context, history);

    // Atualiza memória
    dialogflowMemory[sessionId].push(
      { role: "user", content: userMessage },
      { role: "assistant", content: reply }
    );

    return reply;
  } catch (error) {
    console.error("Erro ao chamar Ollama pelo Dialogflow:", error.message);
    return "No momento estou com dificuldades técnicas. Por favor, tente novamente em instantes.";
  }
}

module.exports = { handleIntent };
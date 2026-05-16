const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "llama3.2";
const TIMEOUT_MS = 30000;

const SYSTEM_PROMPT = `Você é um assistente virtual da EletroFix, uma empresa especializada em manutenção e reparo de eletrônicos.
Você deve responder perguntas sobre:
- Conserto de celulares, notebooks, TVs, videogames e outros eletrônicos
- Diagnóstico de problemas comuns
- Valores aproximados de serviços
- Prazo de entrega e garantia dos serviços
- Cuidados preventivos com eletrônicos
- Orientações iniciais ao cliente

Regras importantes:
- Responda sempre em português brasileiro
- Seja objetivo, simpático e profissional
- Se não souber a resposta, oriente o cliente a entrar em contato diretamente
- Utilize o contexto fornecido para enriquecer suas respostas
- Nunca invente preços ou prazos que não estejam no contexto`;

function log(sessionId, label, value) {
  const time = new Date().toLocaleTimeString("pt-BR");
  console.log(`[${time}] [${sessionId?.slice(0, 8) ?? "dialogflow"}] ${label}: ${value}`);
}

async function askOllama(message, context, history = [], sessionId = null) {
  const startTime = Date.now();

  log(sessionId, "Mensagem recebida", message.slice(0, 60));
  log(sessionId, "Histórico", `${history.length / 2} turno(s)`);
  log(sessionId, "RAG", context ? `${context.length} caracteres de contexto` : "sem contexto");

  const userMessageWithContext = context
    ? `Contexto relevante da base de conhecimento:\n${context}\n\nPergunta do cliente: ${message}`
    : message;

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userMessageWithContext },
  ];

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Ollama] Erro HTTP ${response.status}:`, errorText);
      throw new Error("Ollama retornou um erro.");
    }

    const data = await response.json();
    const reply = data.message.content;
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    log(sessionId, "Resposta gerada", `${elapsed}s — ${reply.length} caracteres`);

    return reply;

  } catch (error) {
    if (error.name === "TimeoutError") {
      console.error(`[Ollama] Timeout após ${TIMEOUT_MS / 1000}s`);
      throw new Error("O modelo demorou demais para responder. Tente novamente.");
    }

    console.error("[Ollama] Erro:", error.message);
    throw new Error("Não foi possível conectar ao modelo de linguagem.");
  }
}

module.exports = { askOllama };
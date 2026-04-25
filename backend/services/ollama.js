const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "llama3.2";

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

async function askOllama(message, context, history = []) {
  // Monta mensagem com contexto RAG
  const userMessageWithContext = context
    ? `Contexto relevante da base de conhecimento:\n${context}\n\nPergunta do cliente: ${message}`
    : message;

  // Monta array de mensagens com histórico + nova mensagem
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userMessageWithContext },
  ];

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do Ollama:", errorText);
      throw new Error("Ollama retornou um erro.");
    }

    const data = await response.json();
    return data.message.content;

  } catch (error) {
    console.error("Erro ao chamar o Ollama:", error.message);
    throw new Error("Não foi possível conectar ao modelo de linguagem.");
  }
}

module.exports = { askOllama };
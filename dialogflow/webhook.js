const express = require("express");
const router = express.Router();
const { handleIntent } = require("./handler");

router.post("/", async (req, res) => {
  const body = req.body;

  // Valida se é uma requisição válida do Dialogflow
  if (!body || !body.queryResult) {
    return res.status(400).json({ error: "Requisição inválida do Dialogflow." });
  }

  try {
    const intentName = body.queryResult.intent.displayName;
    const userMessage = body.queryResult.queryText;
    const sessionId = body.session || "dialogflow-default";

    console.log(`[Dialogflow] Intenção: ${intentName} | Mensagem: ${userMessage}`);

    // Processa a intenção e gera resposta
    const fulfillmentText = await handleIntent(intentName, userMessage, sessionId);

    // Resposta no formato que o Dialogflow espera
    return res.json({ fulfillmentText });

  } catch (error) {
    console.error("Erro no webhook do Dialogflow:", error.message);
    return res.json({
      fulfillmentText: "Desculpe, tive um problema ao processar sua solicitação. Tente novamente.",
    });
  }
});

module.exports = router;
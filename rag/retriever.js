const fs = require("fs");
const path = require("path");
const { knowledgeBase } = require("./knowledge");

// Carrega o knowledge.txt
function loadTxtKnowledge() {
  const filePath = path.join(__dirname, "knowledge.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

// Normaliza texto para comparação
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .trim();
}

// Calcula score de relevância entre a mensagem e um texto
function scoreMatch(message, text) {
  const normalizedMessage = normalize(message);
  const normalizedText = normalize(text);
  const words = normalizedMessage.split(" ").filter((w) => w.length > 3);

  let score = 0;
  for (const word of words) {
    if (normalizedText.includes(word)) {
      score++;
    }
  }
  return score;
}

// Busca no knowledge.js (estruturado com tags)
function searchStructured(message) {
  const normalizedMessage = normalize(message);
  const results = [];

  for (const item of knowledgeBase) {
    let score = 0;

    // Verifica tags
    for (const tag of item.tags) {
      if (normalizedMessage.includes(normalize(tag))) {
        score += 2; // tags têm peso maior
      }
    }

    // Verifica conteúdo
    score += scoreMatch(message, item.content);

    if (score > 0) {
      results.push({ content: item.content, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((r) => r.content);
}

// Busca no knowledge.txt (linhas técnicas)
function searchTxt(message) {
  const lines = loadTxtKnowledge();
  const results = [];

  for (const line of lines) {
    const score = scoreMatch(message, line);
    if (score > 0) {
      results.push({ content: line, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.content);
}

// Função principal de recuperação
function retrieve(message) {
  const structuredResults = searchStructured(message);
  const txtResults = searchTxt(message);

  const allResults = [...structuredResults, ...txtResults];

  if (allResults.length === 0) {
    return null;
  }

  return allResults.join("\n\n");
}

module.exports = { retrieve };
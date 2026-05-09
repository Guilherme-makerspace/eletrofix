"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente virtual da EletroFix. Posso te ajudar com dúvidas sobre manutenção de eletrônicos, orçamentos, prazos e muito mais. Como posso te ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scrolla para o final sempre que uma mensagem nova chegar
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId }),
      });

      const data = await res.json();

      const botMessage: Message = {
        role: "assistant",
        content: data.reply || "Não consegui processar sua mensagem.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao conectar com o servidor. Verifique se o backend está rodando.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }
  async function clearConversation() {
    try {
      await fetch(`http://localhost:3001/api/chat/memory/${sessionId}`, {
        method: "DELETE",
      });
    } catch {
      console.error("Erro ao limpar memória.");
    }
    setMessages([
      {
        role: "assistant",
        content: "Conversa reiniciada! Como posso te ajudar?",
      },
    ]);
    setInput("");
  } 

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col overflow-hidden border border-gray-200 font-sans">
      
      {/* Título do chat */}
      <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-200">
  <div className="flex items-center gap-2">
    <div className="w-2.5 h-2.5 rounded-sm bg-eletro-blue" />
    <span className="text-eletro-dark text-base font-bold tracking-wide uppercase">
      Assistente EletroFix
    </span>
  </div>
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2 border border-gray-200 px-3 py-1 rounded-full">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Online</span>
    </div>
    <button
      onClick={clearConversation}
      className="text-xs text-gray-500 hover:text-gray-800 transition-colors border border-gray-300 hover:border-gray-500 px-3 py-1 rounded-full"
    >
      Nova conversa
    </button>
  </div>
</div>
      
      {/* Faixa azul fina decorativa */}
      <div className="h-1 w-full bg-eletro-blue" />

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4 min-h-[420px] max-h-[420px] bg-eletro-light">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar do bot */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded bg-eletro-blue flex items-center justify-center text-eletro-yellow font-bold text-xs mr-3 flex-shrink-0 mt-1 shadow-sm">
                EF
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-tr-sm border border-gray-200 shadow-sm"
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm"
              }`}
              style={msg.role === "user" ? { backgroundColor: "#ffffff", color: "#1a1a1a" } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Indicador de digitando */}
        {loading && (
  <div className="flex justify-start">
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0"
      style={{ backgroundColor: "#ffffff", color: "#1a1a1a", fontWeight: 700 }}>
      EF
    </div>
    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
      <span style={{
        width: 8, height: 8, borderRadius: "50%", backgroundColor: "#1a1a1a", display: "inline-block",
        animation: "bounce 1s infinite", animationDelay: "0ms"
      }} />
      <span style={{
        width: 8, height: 8, borderRadius: "50%", backgroundColor: "#1a1a1a", display: "inline-block",
        animation: "bounce 1s infinite", animationDelay: "150ms"
      }} />
      <span style={{
        width: 8, height: 8, borderRadius: "50%", backgroundColor: "#1a1a1a", display: "inline-block",
        animation: "bounce 1s infinite", animationDelay: "300ms"
      }} />
    </div>
  </div>
)}

        <div ref={bottomRef} />
      </div>

      {/* Sugestões rápidas */}
      <div className="px-5 py-3 flex gap-2 flex-wrap border-t border-gray-200 bg-white">
        {["ESP-32 é compativél com quais componentes", "Notebook lento", "Problemas com arduino"].map(
          (suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
              }}
              className="text-xs px-4 py-1.5 rounded border border-eletro-blue text-eletro-blue hover:bg-eletro-blue hover:text-white transition-colors font-medium"
            >
              {suggestion}
            </button>
          )
        )}
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-gray-200 flex gap-3 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Faça sua pesquisa aqui..."
          disabled={loading}
          className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm outline-none focus:border-eletro-blue focus:ring-1 focus:ring-eletro-blue disabled:opacity-50 transition-all text-gray-800 placeholder-gray-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-eletro-yellow hover:brightness-105 disabled:opacity-40 text-eletro-dark font-bold px-6 py-2.5 rounded text-sm transition-all disabled:cursor-not-allowed uppercase tracking-wide"
        >
          Enviar
        </button>
      </div>

    </div>
  );
}
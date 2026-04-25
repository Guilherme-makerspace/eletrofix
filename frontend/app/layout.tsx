import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EletroFix — Assistência Técnica Inteligente",
  description: "Chatbot de suporte para manutenção de eletrónicos inspirado na Eletrogate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Importação opcional da fonte para o estilo Eletrogate */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
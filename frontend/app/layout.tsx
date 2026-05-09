import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EletroFix — Assistência Técnica",
  description: "Chatbot inteligente para manutenção de eletrônicos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
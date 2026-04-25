import ChatBox from "./ChatBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Header - Estilo limpo da Eletrogate */}
      <header className="bg-white h-20 px-8 flex items-center justify-between shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Ícone geométrico lembrando o logo */}
          <div className="grid grid-cols-2 gap-[2px] w-8 h-8">
            <div className="bg-eletro-blue w-full h-full rounded-tl-sm"></div>
            <div className="bg-eletro-blue w-full h-full rounded-tr-sm"></div>
            <div className="bg-eletro-blue w-full h-full rounded-bl-sm"></div>
            <div className="bg-eletro-blue w-full h-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <p className="text-eletro-dark font-extrabold text-xl tracking-[0.15em] leading-none uppercase">
              EletroFix
            </p>
            <p className="text-gray-500 text-[10px] mt-1 tracking-wider uppercase font-medium">
              Assistência Técnica em Eletrônicos
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
           <span className="text-sm text-gray-600 font-medium mr-2">Precisa de ajuda? <br/><span className="font-bold text-eletro-dark">Fale Conosco</span></span>
        </div>
      </header>

      {/* Barra amarela decorativa (estilo o botão de ofertas) */}
      <div className="h-1.5 bg-eletro-yellow w-full" />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center px-4 py-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-eletro-blue uppercase tracking-tight">
            Desperte seu lado <span className="text-eletro-yellow bg-eletro-blue px-2">Maker</span>
          </h1>
          <p className="text-gray-600 text-sm mt-3 font-medium">
            Tire suas dúvidas sobre manutenção e reparo de eletrônicos com nossa inteligência artificial.
          </p>
        </div>

        <ChatBox />
      </div>

      {/* Footer */}
      <footer className="bg-eletro-blue py-6 text-center mt-auto">
        <p className="text-white text-sm font-medium tracking-wide">
          © 2024 ELETROFIX — TODOS OS DIREITOS RESERVADOS
        </p>
      </footer>

    </main>
  );
}
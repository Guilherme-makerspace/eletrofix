const knowledgeBase = [
    // ─── CELULARES ───────────────────────────────────────────
    {
      tags: ["tela", "display", "celular", "quebrada", "trincada", "touch"],
      content: `Troca de tela de celular: O serviço inclui substituição completa do display e touch screen. 
      Prazo médio: 1 a 2 dias úteis. 
      Valores aproximados: telas de entrada R$80-R$150, intermediários R$150-R$300, top de linha R$300-R$800. 
      Garantia: 90 dias.`,
    },
    {
      tags: ["bateria", "celular", "carregando", "descarrega", "autonomia"],
      content: `Troca de bateria de celular: Resolvemos problemas de bateria que descarrega rápido, não carrega ou incha.
      Prazo médio: no mesmo dia.
      Valores aproximados: R$80 a R$200 dependendo do modelo.
      Garantia: 90 dias.`,
    },
    {
      tags: ["câmera", "foto", "celular", "borrada", "não funciona"],
      content: `Reparo de câmera de celular: Substituição do módulo de câmera frontal ou traseira.
      Prazo médio: 1 a 2 dias úteis.
      Valores aproximados: R$100 a R$350 dependendo do modelo.
      Garantia: 90 dias.`,
    },
    {
      tags: ["celular", "molhado", "água", "líquido", "caiu"],
      content: `Recuperação de celular molhado: Limpeza e tratamento interno contra corrosão por líquidos.
      IMPORTANTE: Desligue o aparelho imediatamente e não tente carregar.
      Traga o mais rápido possível para aumentar as chances de recuperação.
      Prazo médio: 2 a 3 dias úteis. Avaliação gratuita.`,
    },
  
    // ─── NOTEBOOKS ───────────────────────────────────────────
    {
      tags: ["notebook", "lento", "travando", "devagar", "desempenho"],
      content: `Manutenção de notebook lento: Realizamos limpeza de sistema, troca de pasta térmica, upgrade de memória RAM e substituição de HD por SSD.
      Prazo médio: 1 a 3 dias úteis.
      Troca de HD para SSD: R$150 a R$400 (inclui SSD).
      Upgrade de RAM: R$80 a R$250.
      Garantia: 90 dias.`,
    },
    {
      tags: ["notebook", "tela", "display", "quebrada", "não liga", "preta"],
      content: `Troca de tela de notebook: Substituição de telas quebradas, com listras ou que não acendem.
      Prazo médio: 2 a 4 dias úteis.
      Valores aproximados: R$250 a R$700 dependendo do modelo e tamanho.
      Garantia: 90 dias.`,
    },
    {
      tags: ["notebook", "teclado", "tecla", "não digita", "quebrado"],
      content: `Reparo de teclado de notebook: Substituição de teclas individuais ou teclado completo.
      Prazo médio: 1 a 3 dias úteis.
      Tecla individual: R$30 a R$60. Teclado completo: R$120 a R$300.
      Garantia: 90 dias.`,
    },
    {
      tags: ["notebook", "superaquecendo", "quente", "fan", "ventilador", "barulho"],
      content: `Manutenção térmica de notebook: Limpeza interna completa, troca de pasta térmica e verificação do cooler.
      Essencial para notebooks que desligam sozinhos ou ficam muito quentes.
      Prazo médio: 1 dia útil. Valor: R$80 a R$150.
      Garantia: 90 dias.`,
    },
  
    // ─── TVs ─────────────────────────────────────────────────
    {
      tags: ["tv", "televisão", "não liga", "sem imagem", "tela preta"],
      content: `Reparo de TV sem imagem ou que não liga: Diagnóstico completo de placa fonte, placa principal e painel.
      Prazo médio: 3 a 7 dias úteis. Avaliação gratuita.
      Valores variam conforme o defeito encontrado: R$150 a R$600.
      Garantia: 90 dias.`,
    },
    {
      tags: ["tv", "tela", "manchas", "listras", "quebrada", "trincada"],
      content: `Troca de painel de TV: Em muitos casos a troca de painel pode ser inviável economicamente.
      Fazemos uma avaliação honesta e indicamos a melhor solução.
      Avaliação gratuita. Orçamento sem compromisso.`,
    },
  
    // ─── VIDEOGAMES ──────────────────────────────────────────
    {
      tags: ["videogame", "playstation", "xbox", "nintendo", "controle", "não liga", "travando"],
      content: `Manutenção de videogames: Atendemos PlayStation, Xbox e Nintendo Switch.
      Serviços: limpeza interna, troca de pasta térmica, reparo de leitores e portas HDMI.
      Prazo médio: 2 a 5 dias úteis.
      Valores: R$100 a R$400 dependendo do defeito.
      Garantia: 90 dias.`,
    },
  
    // ─── ATENDIMENTO E POLÍTICA ──────────────────────────────
    {
      tags: ["prazo", "tempo", "demora", "quanto tempo"],
      content: `Prazos da EletroFix:
      - Celulares: 1 a 2 dias úteis (casos simples no mesmo dia)
      - Notebooks: 1 a 4 dias úteis
      - TVs: 3 a 7 dias úteis
      - Videogames: 2 a 5 dias úteis
      Prazos podem variar conforme disponibilidade de peças.`,
    },
    {
      tags: ["garantia", "garantido", "prazo de garantia"],
      content: `Todos os serviços da EletroFix possuem garantia de 90 dias para defeitos relacionados ao reparo realizado.
      A garantia não cobre danos físicos ou por líquidos após o reparo.`,
    },
    {
      tags: ["orçamento", "avaliação", "diagnóstico", "cobram", "gratuito"],
      content: `A avaliação e o orçamento da EletroFix são gratuitos e sem compromisso.
      Você só paga se aprovar o serviço.
      Caso não aprove, devolvemos o aparelho sem nenhuma cobrança.`,
    },
    {
      tags: ["pagamento", "forma de pagamento", "pix", "cartão", "parcelado"],
      content: `Formas de pagamento aceitas na EletroFix:
      - PIX (5% de desconto)
      - Cartão de débito
      - Cartão de crédito em até 6x sem juros
      - Dinheiro`,
    },
    {
      tags: ["endereço", "localização", "onde fica", "loja", "presencial"],
      content: `A EletroFix atende de forma presencial e também oferece serviço de coleta e entrega.
      Entre em contato pelo WhatsApp para agendar ou tirar dúvidas: (83) 99999-9999.
      Horário de atendimento: Segunda a Sexta das 8h às 18h, Sábado das 8h às 13h.`,
    },
    {
      tags: ["preventivo", "cuidado", "dica", "conservar", "durar mais"],
      content: `Dicas preventivas da EletroFix:
      - Evite usar o aparelho carregando por longos períodos
      - Mantenha os aparelhos longe de líquidos e umidade
      - Limpe as entradas de ar de notebooks regularmente
      - Use capas protetoras em celulares
      - Não deixe o notebook em superfícies que bloqueiem a ventilação
      - Faça manutenção preventiva anual em notebooks`,
    },
  ];
  
  module.exports = { knowledgeBase };
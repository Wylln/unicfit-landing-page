# DIRETRIZES DE DIREÇÃO DE IMAGEM E FOTOGRAFIA — UNICFIT

> **Elaborado por:** Agente 4 — Image & Photography Designer  
> **Destinatário:** Agente 1 — Creative Director, Agente 7 — Frontend Implementer  
> **Status:** Especificação de Tratamento e Composição Fotográfica  

---

## 1. PRESERVAÇÃO DA AUTENTICIDADE FOTOGRÁFICA

A Unicfit possui patrimônio visual autêntico capturado em sua fachada e no salão de treinos. O papel do design de imagem não é mascarar ou substituir essas fotos por bancos de imagens genéricos de atletas sorrindo em estúdios brancos, mas sim **elevar a fotografia real a um nível cinematográfico**.

---

## 2. ESPECIFICAÇÃO DOS ASSETS REAIS

### Asset 1: Fachada Oficial (`assets/unicfit-facade.png`)
- **Origem:** Fachada real da academia iluminada em tons roxos e azuis com o letreiro luminoso da Unicfit.
- **Enquadramento & Tratamento:**
  - Aplicação com máscara alfa gradual à esquerda (`mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.85) 25%, #000 100%)`).
  - Fusão com o fundo `--color-bg` (#0B0A10): as sombras do prédio desvanecem no vazio escuro da página, garantindo contraste 100% legível para os títulos brancos e botões luminosos.
  - No desktop: posicionado na asa direita (`width: 58%`), criando uma composição diagonal assimétrica.
  - No mobile: posicionamento com opacidade controlada (`opacity: 0.65`) e gradiente inferior escuro para manter o letreiro do topo e o texto perfeitamente legíveis.

### Asset 2: Salão de Musculação e Equipamentos (`assets/unicfit-interior.jpg`)
- **Origem:** Registro fotográfico de alta resolução (1536x1024) da área de musculação, anilhas, aparelhos de puxada e escadaria sob iluminação neon.
- **Composição no Layout:**
  - `object-fit: cover` com `object-position: center`.
  - Sobreposição de moldura técnica com borda violeta deslocada (`.visual-outline`), gerando profundidade e efeito de camada dimensional.
  - Badge de assinatura em alto contraste (`✳ ESPAÇO PARA SUA PRÓXIMA CONQUISTA`) ancorado no canto inferior direito.
  - Overlay de atmosfera com leve gradiente radial para evitar saturações agressivas.

---

## 3. REGRA CONTRA O "EFEITO RECORTE FALSO"

Nenhuma imagem deve parecer "jogada" na tela com bordas retas e duras sem diálogo com o fundo. Todas as transições entre imagem e background devem ser mediadas por:
1. Gradientes de fusão linear ou radial.
2. Bordas geométricas intencionais inspiradas em design industrial.
3. Elementos gráficos flutuantes (como os aros orbitais e faixas de velocidade da marca) que costuram a foto ao código.

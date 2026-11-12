# BRAND SYSTEM UNICFIT — DIRETRIZES OFICIAIS DE IDENTIDADE VISUAL

> **Autor:** Agente 3 — Brand & Art Designer  
> **Revisão:** Agente 1 — Creative Director  
> **Fonte:** Brandboard Oficial Unicfit (`ref-unicfit-brandboard.png`) e Arquitetura de Referência (`ref-forgefit-structure.png`)  
> **Data:** Novembro de 2026

---

## 1. PALETA CROMÁTICA OFICIAL (HEX EXATOS DO BRANDBOARD)

```css
:root {
  /* Fundo e Superfícies */
  --color-bg: #0B0B0F;           /* Cinza Escuro profundo - Fundo geral */
  --color-surface-dark: #121218; /* Superfície de contraste primária */
  --color-surface: #1F1F25;      /* Cinza Médio - Superfície de Cards e Bento Grid */
  --color-surface-hover: #282832;

  /* Cores de Marca (Luz & Energia) */
  --color-purple: #8B5CF6;       /* Roxo Principal - Assinatura vibrante da marca */
  --color-purple-dark: #6D28D9;  /* Roxo Escuro - Profundidade e gradientes */
  --color-purple-glow: rgba(139, 92, 246, 0.35);
  --color-cyan: #06B6D4;         /* Azul Elétrico / Ciano - Acentos de alta voltagem */

  /* Textos e Neutros */
  --color-text-white: #FFFFFF;   /* Títulos e destaques principais */
  --color-text-body: #E5E7EB;    /* Texto de leitura */
  --color-text-muted: #9CA3AF;   /* Cinza Claro - Legendas e metadados */
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-purple: rgba(139, 92, 246, 0.45);
}
```

---

## 2. REGRAS TIPOGRÁFICAS

- **Família Display:** `Montserrat` (ou `Barlow Condensed`), peso 800 (ExtraBold) e 900 (Black).
- **Tratamento de Títulos:**
  - Todo em Caixa Alta (Uppercase) com espaçamento de letras intencional (`letter-spacing: -0.01em`).
  - **Destaque Cromático por Palavra-Chave:**
    - No Hero: `SUA FORÇA. SEU <span class="text-purple">PRÓXIMO</span> NÍVEL.`
    - Na Estrutura: `INFRAESTRUTURA <span class="text-purple">COMPLETA</span>`
    - Nos Planos: `PLANOS <span class="text-purple">FLEXÍVEIS</span>`
- **Família de Texto Contínuo:** `Montserrat` / `Manrope` (pesos 400, 500, 600).

---

## 3. COMPONENTES E ELEMENTOS GRÁFICOS OFICIAIS

1. **Botões em Pílula (Pill Buttons):**
   - **Primário:** Gradiente linear a 115° de `--color-purple` (`#8B5CF6`) até `--color-purple-dark` (`#6D28D9`), bordas totalmente arredondadas (`border-radius: 9999px`), sombra luminescente roxa (`box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35)`).
   - **Secundário (Outline):** Fundo translúcido, borda sutil `--color-border-purple`, texto branco com seta indicativa.
2. **Faixas Diagonais (Lightning Slash Slices):**
   - Elementos em paralelogramo inclinado (`transform: skewX(-15deg)`), com gradiente angular cruzando de `--color-cyan` (`#06B6D4`) a `--color-purple` (`#8B5CF6`).
3. **Bento Grid Assimétrico:**
   - Quebra obrigatória da monotonia de 3 cards idênticos.
   - Combinação de cartões de diferentes proporções (quadrados, horizontais largos e verticais) com fotos reais, citações e dados da academia.
4. **Iluminação Neon Autêntica:**
   - Resplendor ambiente suave em tons violeta e ciano nas bordas das fotografias e cards, replicando a atmosfera real do salão de treino da Unicfit em Macapá.

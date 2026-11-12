# ARQUITETURA DE EXPERIÊNCIA & UI/UX — UNICFIT

> **Elaborado por:** Agente 5 — UI/UX Designer  
> **Destinatário:** Agente 1 — Creative Director, Agente 7 — Frontend Implementer  
> **Status:** Especificação de Arquitetura de Informação e Usabilidade  

---

## 1. RITMO DA JORNADA DO USUÁRIO — NARRATIVA NÃO-LINEAR

Uma landing page comercial eficiente não é uma lista estática de dados, mas uma narrativa que conduz o visitante do impacto emocional até a decisão de contato.

```
┌────────────────────────────────────────────────────────────────────────┐
│ FLUXO DA NARRATIVA VISUAL                                              │
│                                                                        │
│ 1. IMPACTO E IDENTIDADE (Hero) ──> Presença imponente, fachada real.   │
│ 2. MOVIMENTO E PROPOSTA (Modalidades) ──> O que você vai treinar.      │
│ 3. PROVA DE ESTRUTURA (Ambiente) ──> Onde você vai treinar.            │
│ 4. COMUNIDADE E RESULTADOS (Instagram) ──> Quem treina com você.       │
│ 5. ESCOLHA DE PLANOS (Planos) ──> Como começar agora.                  │
│ 6. LOCALIZAÇÃO E CONVENIÊNCIA (Unidades + Mapa) ──> Onde estamos.      │
│ 7. OBJEÇÕES RESOLVIDAS (FAQ) ──> Respostas rápidas e transparentes.    │
│ 8. FECHAMENTO (CTA Final & WhatsApp) ──> Canal direto com a recepção.  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. QUEBRA DE UNIFORMIDADE COMPOSICIONAL

Para combater a repetição monótona que caracteriza interfaces geradas por templates automatizados, cada seção da Unicfit adota um formato composicional singular:

1. **Hero:** Bloco editorial monumental à esquerda com foto panorâmica vazando à direita em fade gradual.
2. **Modalidades:** Grid triplo assimétrico com destaque cromático no card central/principal (`.modality-card-featured`).
3. **Estrutura:** Layout dividido 1:1 assimétrico com molduras flutuantes sobrepostas e lista técnica de atributos.
4. **Resultados (Instagram):** Faixa de social proof com grid de estilo galeria urbana e link direto para o canal oficial `@unicfit_mcp`.
5. **Planos:** Tabela com hierarquia clara em três níveis (Básico, Destaque com selo luminoso superior e Flexível), evitando cards com a mesma altura visual sem orientação.
6. **Unidades:** Bloco híbrido combinando cards de informações verificadas com widget interativo de geolocalização e mapa integrado.
7. **FAQ:** Acordeão minimalista em lista de alto contraste com abertura suave sem saltos de layout.

---

## 3. ERGONOMIA MOBILE E ZONA DO POLEGAR

Mais de 75% dos acessos virão de smartphones:
- **Botão Flutuante do WhatsApp:** Fixado a 24px do canto inferior direito com diâmetro de 54px, na zona de maior alcance do polegar.
- **Header Fixo Responsivo:** Com altura reduzida para 70px no mobile, efeito de vidro fosco (`backdrop-filter: blur(16px)`) e botão de menu com área de toque mínima de 44x44px.
- **Tipografia Escalonada:** Títulos com tamanho dinâmico via `clamp()` para nunca quebrarem palavras de forma antiestética em telas de 360px a 480px.

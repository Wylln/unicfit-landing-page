# SISTEMA DE MOVIMENTO E MICROINTERAÇÕES — UNICFIT

> **Elaborado por:** Agente 6 — Motion & Interaction Designer  
> **Destinatário:** Agente 1 — Creative Director, Agente 7 — Frontend Implementer  
> **Status:** Especificação de Animações, Transições e Acessibilidade  

---

## 1. FILOSOFIA DE MOVIMENTO: CINÉTICA ATLÉTICA

O movimento no site da Unicfit deve simular a física do treino de força e velocidade:
- **Aceleração Instantânea:** O início do movimento é rápido e reativo ao toque/cursor.
- **Amortecimento Preciso (Ease-out):** Desaceleração suave baseada na curva cúbica `--ease-out: cubic-bezier(.2, .8, .2, 1)`.
- **Sem Fricção Desnecessária:** Animações com duração máxima de 200ms a 300ms. Animações longas ou lentas que atrasam a navegação são terminantemente proibidas.

---

## 2. CATÁLOGO DE MICROINTERAÇÕES

1. **Botões de Ação (`.button`, `.btn-whatsapp`):**
   - No hover: elevação sutil `transform: translateY(-2px)`, ampliação do brilho de sombra e deslocamento direcional da seta indicadora (`transform: translate(2px, -2px)`).
   - No clique ativo: recuo háptico `transform: translateY(0px) scale(0.98)`.
2. **Cards de Modalidades e Planos:**
   - No hover: elevação suave de 5px com transição de cor de borda de cinza sutil para violeta luminescente (`border-color: rgba(139,43,226,.5)`).
3. **Indicador de Pulso em Tempo Real (`.pulse-dot`):**
   - Animação de pulso contínuo (`box-shadow: 0 0 15px rgba(93,217,240,.65)`) sinalizando dinamismo na busca de unidades mais próximas.
4. **FAQ Accordion:**
   - Abertura com rotação fluida do ícone indicador `+` para `×` e expansão suave da resposta.

---

## 3. ACESSIBILIDADE E PERFORMANCE (`prefers-reduced-motion`)

Para usuários com sensibilidade vestibular ou que tenham redução de movimento ativada em seus dispositivos:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Isso garante conformidade WCAG AAA em termos de animações.

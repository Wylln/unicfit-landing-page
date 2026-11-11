/**
 * Single source of truth for the Unicfit demonstration.
 * Commercial details stay explicitly provisional until the owner confirms them.
 */
export const unicfitData = {
  brand: {
    name: 'Unicfit Academia',
    shortName: 'Unicfit',
    slogan: '',
    isConfirmed: true,
  },
  demonstration: true,
  contact: {
    phone: '',
    whatsapp: '',
    instagram: 'https://www.instagram.com/unicfit_mcp',
    instagramHandle: '@unicfit_mcp',
    isConfirmed: false,
    pendingLabel: 'Contato oficial a confirmar com a academia.',
  },
  units: [
    {
      id: 'unidade-congos',
      name: 'Academia UnicFit - Congós',
      city: 'Macapá',
      state: 'AP',
      neighborhood: 'Congós',
      address: 'Av. Bem-Hur Corrêa Alves, 1135, Congós, Macapá - AP',
      lat: 0.0152,
      lng: -51.0825,
      hours: 'Abre às 06:00',
      rating: 4.8,
      reviews: 17,
      isProvisional: false,
    },
    {
      id: 'unidade-andre-costa',
      name: 'Academia Unicfit',
      city: 'Macapá',
      state: 'AP',
      address: 'R. André de Oliveira Costa, 592, Macapá - AP',
      lat: 0.0368,
      lng: -51.0638,
      hours: '06:00 às 23:00',
      rating: 4.7,
      reviews: 136,
      isProvisional: false,
    },
  ],
  modalities: [
    { id: 'musculacao', name: 'Musculação', description: 'Consulte a unidade para confirmar disponibilidade.', isProvisional: true },
    { id: 'condicionamento', name: 'Condicionamento', description: 'Consulte a unidade para confirmar disponibilidade.', isProvisional: true },
    { id: 'acompanhamento', name: 'Acompanhamento', description: 'Converse com a equipe sobre os serviços disponíveis.', isProvisional: true },
  ],
  plans: [
    { id: 'essencial', name: 'Essencial', price: null, isProvisional: true },
    { id: 'unicfit', name: 'Unicfit', price: null, isProvisional: true },
    { id: 'flex', name: 'Flex', price: null, isProvisional: true },
  ],
  faq: [
    {
      id: 'planos',
      question: 'Quais planos estão disponíveis?',
      answer: 'Os planos e valores precisam ser confirmados diretamente com a equipe da Unicfit.',
      isProvisional: true,
    },
    {
      id: 'visita',
      question: 'Posso conhecer a academia?',
      answer: 'Consulte a equipe da Unicfit para confirmar as opções de visita e atendimento.',
      isProvisional: true,
    },
    {
      id: 'horarios',
      question: 'Quais são os horários de funcionamento?',
      answer: 'Os horários confirmados estão informados nos dados de cada unidade. Consulte a equipe para confirmar feriados e exceções.',
      isProvisional: true,
    },
  ],
  pending: [
    'Número de telefone/WhatsApp oficial para conversão comercial',
  ],
};

export const findPlan = (planId) =>
  unicfitData.plans.find((plan) => plan.id === planId) ?? null;

export const findUnit = (unitId) =>
  unicfitData.units.find((unit) => unit.id === unitId) ?? null;

export const getPlanLabel = (planId) => findPlan(planId)?.name ?? '';

export const getUnitLabel = (unitId) => findUnit(unitId)?.name ?? '';

const makeElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

/** Render the centrally managed demo plan options into an existing grid. */
export function renderPlans(container, { onSelect } = {}) {
  if (!container) return;
  const cards = unicfitData.plans.map((plan) => {
    const card = makeElement('article', 'plan-card');
    const heading = makeElement('h3', '', plan.name);
    const disclaimer = makeElement('p', 'content-disclaimer', 'Opção demonstrativa · condições e valores a confirmar.');
    const button = makeElement('button', 'btn-select-plan', 'Consultar este plano');
    button.type = 'button';
    button.dataset.plan = plan.id;
    button.addEventListener('click', () => onSelect?.(plan));
    card.append(heading, disclaimer, button);
    return card;
  });
  container.replaceChildren(...cards);
}

/** Render FAQ content without injecting HTML from the data source. */
export function renderFaq(container) {
  if (!container) return;
  const items = unicfitData.faq.map((entry, index) => {
    const item = makeElement('details', 'faq-item');
    const question = makeElement('summary', 'faq-question', entry.question);
    const answer = makeElement('div', 'faq-answer');
    answer.id = `faq-answer-${index + 1}`;
    answer.append(makeElement('p', '', entry.answer));
    question.setAttribute('aria-controls', answer.id);
    item.append(question, answer);
    return item;
  });
  container.replaceChildren(...items);
}

/** Render location placeholders while the owner confirms current unit details. */
export function renderUnits(container, { onContact } = {}) {
  if (!container) return;
  const cards = unicfitData.units.map((unit) => {
    const card = makeElement('article', 'unit-card');
    const label = [unit.city, unit.state].filter(Boolean).join(' · ');
    const location = makeElement('span', 'unit-status', label || 'Unidade a confirmar');
    const heading = makeElement('h3', '', unit.name);
    const detailsText = [unit.address, unit.hours].filter(Boolean).join(' · ');
    const details = makeElement('p', '', detailsText || 'Endereço e horário pendentes de confirmação.');
    if (Number.isFinite(unit.rating) && Number.isFinite(unit.reviews)) {
      const rating = makeElement('p', 'unit-rating', `★ ${unit.rating} · ${unit.reviews} avaliações`);
      card.append(location, heading, details, rating);
    } else {
      card.append(location, heading, details);
    }
    const button = makeElement('button', 'unit-contact', 'Consultar informações');
    button.type = 'button';
    button.dataset.unitContact = unit.id;
    button.addEventListener('click', () => onContact?.(unit));
    card.append(button);
    return card;
  });
  container.replaceChildren(...cards);
}

/**
 * Single source of truth for the Unicfit demonstration.
 * Official contact, real units in Macapá, and confirmed business details.
 */
export const unicfitData = {
  brand: {
    name: 'Unicfit Academia',
    shortName: 'Unicfit',
    slogan: 'Sua Força. Seu Próximo Nível.',
    isConfirmed: true,
  },
  demonstration: false,
  contact: {
    phone: '5596981295678',
    whatsapp: '5596981295678',
    displayPhone: '(96) 98129-5678',
    defaultMessage: 'Olá, gostaria de saber mais informações sobre os planos e a academia',
    instagram: 'https://www.instagram.com/unicfit_mcp',
    instagramHandle: '@unicfit_mcp',
    isConfirmed: true,
  },
  units: [
    {
      id: 'unidade-congos',
      name: 'Academia UnicFit - Congós',
      city: 'Macapá',
      state: 'AP',
      neighborhood: 'Congós',
      address: 'Av. Ben-Hur Corrêa Alves, 1135 - Congós, Macapá - AP',
      lat: 0.0066806,
      lng: -51.0880613,
      mapsUrl: 'https://www.google.com/maps/place/Academia+UnicFit+-+Cong%C3%B3s/@0.0066806,-51.0887051,19z/data=!4m6!3m5!1s0x8d61e110ebcb4e8d:0x6c4c71b4cc0ff161!8m2!3d0.0066806!4d-51.0880613!16s%2Fg%2F11srtm74r5',
      hours: 'Segunda a Sexta · 06:00 às 23:00',
      rating: 4.8,
      reviews: 17,
      isProvisional: false,
    },
    {
      id: 'unidade-andre-costa',
      name: 'Academia Unicfit',
      city: 'Macapá',
      state: 'AP',
      neighborhood: 'Santa Inês',
      address: 'R. André de Oliveira Costa, 592 - Macapá - AP',
      lat: 0.0368,
      lng: -51.0638,
      mapsUrl: 'https://www.google.com/maps/search/unicfit/@0.0368,-51.0638,17z',
      hours: 'Segunda a Sexta · 06:00 às 23:00',
      rating: 4.7,
      reviews: 136,
      isProvisional: false,
    },
  ],
  modalities: [
    { id: 'musculacao', name: 'Musculação', description: 'Treino de força para hipertrofia, emagrecimento e resistência.', isProvisional: false },
    { id: 'condicionamento', name: 'Condicionamento', description: 'Exercícios cardiovasculares e funcionais de alta intensidade.', isProvisional: false },
    { id: 'acompanhamento', name: 'Acompanhamento', description: 'Profissionais na sala para orientação e segurança.', isProvisional: false },
  ],
  plans: [
    { id: 'essencial', name: 'Essencial', price: null, isProvisional: true },
    { id: 'unicfit', name: 'Unicfit VIP', price: null, isProvisional: true },
    { id: 'flex', name: 'Flex', price: null, isProvisional: true },
  ],
  faq: [
    {
      id: 'planos',
      question: 'Quais planos estão disponíveis?',
      answer: 'Temos opções de planos flexíveis e planos completos com acesso total à musculação e acompanhamento profissional. Fale conosco pelo WhatsApp no número (96) 98129-5678 para consultar as condições vigentes.',
      isProvisional: false,
    },
    {
      id: 'visita',
      question: 'Posso conhecer a academia antes de me matricular?',
      answer: 'Sim! Basta comparecer à recepção de qualquer uma de nossas unidades (Congós ou Santa Inês) ou mandar uma mensagem no WhatsApp para agendar uma apresentação com nossa equipe.',
      isProvisional: false,
    },
    {
      id: 'horarios',
      question: 'Quais são os horários de funcionamento?',
      answer: 'Nossas unidades funcionam de segunda a sexta-feira, das 06:00 às 23:00, e aos sábados e domingos em horários especiais.',
      isProvisional: false,
    },
  ],
  pending: [],
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
    const disclaimer = makeElement('p', 'content-disclaimer', 'Consulte valores e condições especiais pelo WhatsApp.');
    const button = makeElement('button', 'btn-select-plan btn-whatsapp', 'Consultar este plano');
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
    const location = makeElement('span', 'unit-status', label || 'Macapá · AP');
    const heading = makeElement('h3', '', unit.name);
    const detailsText = [unit.address, unit.hours].filter(Boolean).join(' · ');
    const details = makeElement('p', '', detailsText);
    if (Number.isFinite(unit.rating) && Number.isFinite(unit.reviews)) {
      const rating = makeElement('p', 'unit-rating', `★ ${unit.rating} · ${unit.reviews} avaliações`);
      card.append(location, heading, details, rating);
    } else {
      card.append(location, heading, details);
    }
    const button = makeElement('button', 'unit-contact btn-whatsapp', 'Consultar pelo WhatsApp');
    button.type = 'button';
    button.dataset.unitContact = unit.id;
    button.addEventListener('click', () => onContact?.(unit));
    card.append(button);
    return card;
  });
  container.replaceChildren(...cards);
}

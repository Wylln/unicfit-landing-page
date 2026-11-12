import { findPlan, findUnit, unicfitData } from '../data/unicfitData.js';

const cleanPhone = (value = '') => value.replace(/\D/g, '');

/**
 * Return official wa.me URL for Unicfit WhatsApp atendimento.
 * Number: 5596981295678 (Macapá · AP)
 */
export function generateWhatsAppUrl(planId, unitId, customSubject) {
  const number = cleanPhone(unicfitData.contact.whatsapp) || '5596981295678';
  const defaultMsg = 'Olá, gostaria de saber mais informações sobre os planos e a academia';

  const plan = findPlan(planId);
  const unit = findUnit(unitId);

  let message = defaultMsg;
  if (customSubject?.trim()) {
    message = customSubject.trim();
  } else if (plan && unit) {
    message = `Olá, gostaria de saber mais informações sobre os planos e a academia (interesse no ${plan.name} na unidade ${unit.name}).`;
  } else if (plan) {
    message = `Olá, gostaria de saber mais informações sobre os planos e a academia (interesse no ${plan.name}).`;
  } else if (unit) {
    message = `Olá, gostaria de saber mais informações sobre os planos e a academia (unidade ${unit.name}).`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppAction(planId, unitId, customSubject) {
  return {
    available: true,
    url: generateWhatsAppUrl(planId, unitId, customSubject),
    message: 'Redirecionando para o WhatsApp oficial da Unicfit...',
  };
}

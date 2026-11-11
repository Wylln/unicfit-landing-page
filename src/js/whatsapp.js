import { findPlan, findUnit, unicfitData } from '../data/unicfitData.js';

const cleanPhone = (value = '') => value.replace(/\D/g, '');

/**
 * Return a wa.me URL only when a real, confirmed destination is configured.
 * A missing number deliberately returns null so the UI can show a safe demo
 * contact prompt instead of sending visitors to a made-up destination.
 */
export function generateWhatsAppUrl(planId, unitId, customSubject) {
  const number = cleanPhone(unicfitData.contact.whatsapp || unicfitData.contact.phone);
  if (!unicfitData.contact.isConfirmed || number.length < 12 || number.length > 15) {
    return null;
  }

  const plan = findPlan(planId);
  const unit = findUnit(unitId);
  const subject = customSubject?.trim();
  const details = [
    subject || (plan ? `Tenho interesse no ${plan.name}` : 'Gostaria de conhecer a Unicfit'),
    unit ? `da unidade ${unit.name}` : '',
    'e gostaria de receber mais informações.',
  ].filter(Boolean).join(' ');
  const message = `Olá, ${unicfitData.brand.name}! ${details}`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppAction(planId, unitId, customSubject) {
  const url = generateWhatsAppUrl(planId, unitId, customSubject);
  return url
    ? { available: true, url }
    : {
        available: false,
        url: null,
        message: 'O WhatsApp oficial será adicionado após confirmação da academia.',
      };
}

import { unicfitData, findPlan, findUnit } from '../data/unicfitData.js';
import { getWhatsAppAction } from './whatsapp.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: true };

const EARTH_RADIUS_KM = 6371;

export function calculateDistanceKm(pointA, pointB) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const latitudeDelta = toRadians(pointB.lat - pointA.lat);
  const longitudeDelta = toRadians(pointB.lng - pointA.lng);
  const latitudeA = toRadians(pointA.lat);
  const latitudeB = toRadians(pointB.lat);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(latitudeA) * Math.cos(latitudeB) * Math.sin(longitudeDelta / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function buildGoogleMapsRouteUrl(origin, destination) {
  const params = ['api=1'];
  if (origin) params.push(`origin=${encodeURIComponent(`${origin.lat},${origin.lng}`)}`);
  params.push(`destination=${encodeURIComponent(destination)}`);
  return `https://www.google.com/maps/dir/?${params.join('&')}`;
}

export function buildGoogleMapsEmbedUrl(unit) {
  const query = `${unit.lat},${unit.lng}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

function headerOffset() {
  return ($('header') ?? $('.site-header') ?? $('.header'))?.getBoundingClientRect().height ?? 0;
}

function scrollToSection(target) {
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset() - 12;
  window.scrollTo({ top, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
}

function getOrCreateContactDialog() {
  let dialog = $('#contact-modal');
  if (dialog) return dialog;

  dialog = document.createElement('dialog');
  dialog.id = 'contact-modal';
  dialog.className = 'contact-modal';
  dialog.setAttribute('aria-labelledby', 'contact-modal-title');
  dialog.style.cssText = 'max-width:min(92vw,32rem);border:1px solid #51445f;border-radius:1rem;padding:2rem;background:#191720;color:#f2f1f5;box-shadow:0 1rem 4rem #0009';
  dialog.innerHTML = `
    <button type="button" class="contact-modal__close" data-modal-close aria-label="Fechar">&times;</button>
    <p class="contact-modal__eyebrow">Demonstração</p>
    <h2 id="contact-modal-title">Vamos conversar sobre seu treino?</h2>
    <p data-modal-copy></p>
    <div class="contact-modal__actions">
      <a class="btn-whatsapp" data-modal-whatsapp hidden target="_blank" rel="noopener noreferrer">Continuar no WhatsApp</a>
      <button type="button" data-copy-message>Copiar mensagem</button>
      <button type="button" data-modal-close>Fechar</button>
    </div>`;
  document.body.append(dialog);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-modal-close]')) dialog.close();
    if (event.target.closest('[data-copy-message]')) {
      const copy = $('[data-modal-copy]', dialog)?.textContent ?? '';
      const button = $('[data-copy-message]', dialog);
      if (!navigator.clipboard?.writeText) {
        if (button) button.textContent = 'Selecione e copie a mensagem acima';
        return;
      }
      navigator.clipboard.writeText(copy).then(() => {
        if (button) button.textContent = 'Mensagem copiada';
      }).catch(() => {
        if (button) button.textContent = 'Selecione e copie a mensagem acima';
      });
    }
  });
  dialog.addEventListener('close', () => {
    const button = $('[data-copy-message]', dialog);
    if (button) button.textContent = 'Copiar mensagem';
  });
  return dialog;
}

function openContactModal({ planId, unitId, subject } = {}) {
  const plan = findPlan(planId);
  const unit = findUnit(unitId);
  const dialog = getOrCreateContactDialog();
  const planText = plan ? `Tenho interesse no ${plan.name}.` : '';
  const unitText = unit ? ` Unidade: ${unit.name}.` : '';
  const message = `Olá, gostaria de conversar com a equipe da ${unicfitData.brand.name}. ${subject ?? planText}${unitText}`.trim();
  $('[data-modal-copy]', dialog).textContent = `${message} ${unicfitData.contact.pendingLabel}`;
  const whatsApp = $('[data-modal-whatsapp]', dialog);
  const action = getWhatsAppAction(planId, unitId, subject);
  if (action.available) {
    whatsApp.href = action.url;
    whatsApp.hidden = false;
  } else {
    whatsApp.hidden = true;
    whatsApp.removeAttribute('href');
  }
  if (!dialog.open) dialog.showModal();
}

function bindMobileMenu() {
  const button = $('#btn-mobile-menu');
  const menu = $('#mobile-menu');
  if (!button || !menu) return;

  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    menu.style.display = open ? '' : 'none';
    menu.classList.toggle('is-open', open);
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  setOpen(false);
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) setOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (button.getAttribute('aria-expanded') === 'true' && !menu.contains(event.target) && !button.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}

function bindSmoothScroll() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    if (link.matches('.btn-whatsapp, .btn-select-plan, .unit-contact') || event.defaultPrevented) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = $(hash);
    if (!target) return;
    event.preventDefault();
    scrollToSection(target);
    if (history.replaceState) history.replaceState(null, '', hash);
  });
}

function bindFaq() {
  $$('.faq-item').forEach((item, index) => {
    const question = $('.faq-question', item);
    const answer = $('.faq-answer', item);
    if (!question || !answer) return;
    if (!answer.id) answer.id = `faq-answer-${index + 1}`;
    question.setAttribute('aria-controls', answer.id);
    if (item instanceof HTMLDetailsElement) {
      const syncExpanded = () => question.setAttribute('aria-expanded', String(item.open));
      syncExpanded();
      item.addEventListener('toggle', syncExpanded);
      question.addEventListener('click', () => requestAnimationFrame(syncExpanded));
      return;
    }
    question.setAttribute('aria-expanded', String(!answer.hidden));
    item.classList.toggle('is-open', !answer.hidden);
    question.addEventListener('click', () => {
      const opening = question.getAttribute('aria-expanded') !== 'true';
      question.setAttribute('aria-expanded', String(opening));
      answer.hidden = !opening;
      item.classList.toggle('is-open', opening);
    });
  });
}

function bindPlanSelection() {
  $('#plans-grid')?.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-select-plan');
    if (!button) return;
    event.preventDefault();
    const planId = button.dataset.plan;
    const planName = findPlan(planId)?.name ?? $('.plan-card h3', button.closest('.plan-card'))?.textContent.trim();
    const subject = planName ? `Tenho interesse no plano ${planName}.` : undefined;
    document.dispatchEvent(new CustomEvent('unicfit:plan-selected', { detail: { planId, plan: findPlan(planId) } }));
    const action = getWhatsAppAction(planId, button.dataset.unit, subject);
    if (action.available) window.open(action.url, '_blank', 'noopener,noreferrer');
    else openContactModal({ planId, unitId: button.dataset.unit, subject });
  });
}

function bindWhatsAppCtas() {
  const selectors = '#btn-cta-hero, #btn-whatsapp-floating, .btn-whatsapp';
  $$(selectors).forEach((button) => {
    button.addEventListener('click', (event) => {
      const action = getWhatsAppAction(button.dataset.plan, button.dataset.unit, button.dataset.subject);
      if (action.available) {
        event.preventDefault();
        window.open(action.url, '_blank', 'noopener,noreferrer');
        return;
      }
      event.preventDefault();
      openContactModal({ planId: button.dataset.plan, unitId: button.dataset.unit, subject: button.dataset.subject });
    });
  });
}

function bindUnitChoices() {
  $('#units-grid')?.addEventListener('click', (event) => {
    const cardLink = event.target.closest('.unit-contact[data-unit]');
    const generatedButton = event.target.closest('[data-unit-contact]');
    const control = cardLink ?? generatedButton;
    if (!control) return;
    event.preventDefault();
    const unitId = control.dataset.unitContact || control.dataset.unit;
    const unit = findUnit(unitId);
    if (!unit) return;
    selectUnitForRoute(unit, { origin: currentUserLocation });
  });
}

let currentUserLocation = null;

function updateMapAndRoute(unit, origin) {
  const mapFrame = $('#units-map-frame');
  if (mapFrame) {
    mapFrame.src = buildGoogleMapsEmbedUrl(unit);
    mapFrame.title = `Mapa da unidade ${unit.name}`;
  }
  const routeLink = $('#btn-open-route');
  if (routeLink) {
    routeLink.href = buildGoogleMapsRouteUrl(origin, unit.address);
    routeLink.target = '_blank';
    routeLink.rel = 'noopener noreferrer';
  }
}

function markUnitCard(unit, isNearest) {
  $$('#units-grid .unit-card').forEach((card) => {
    card.classList.remove('is-nearest', 'is-selected');
    card.querySelector('.unit-nearest-badge')?.remove();
  });
  const control = $$('#units-grid [data-unit], #units-grid [data-unit-contact]')
    .find((element) => (element.dataset.unit || element.dataset.unitContact) === unit.id);
  const card = control?.closest('.unit-card');
  if (!card) return;
  card.classList.add(isNearest ? 'is-nearest' : 'is-selected');
  if (isNearest) {
    const badge = document.createElement('span');
    badge.className = 'unit-nearest-badge';
    badge.textContent = 'Mais próxima';
    (card.querySelector('.unit-topline') ?? card).append(badge);
  }
}

function selectUnitForRoute(unit, { origin = null, isNearest = false } = {}) {
  markUnitCard(unit, isNearest);
  updateMapAndRoute(unit, origin);
  if (!isNearest) {
    const status = $('#locate-status');
    if (status) status.textContent = `Rota selecionada: ${unit.name}.`;
  }
}

function nearestUnitTo(point) {
  return unicfitData.units
    .filter((unit) => Number.isFinite(unit.lat) && Number.isFinite(unit.lng))
    .map((unit) => ({ unit, distance: calculateDistanceKm(point, unit) }))
    .sort((a, b) => a.distance - b.distance)[0] ?? null;
}

function bindUserLocation() {
  const button = $('#btn-locate-user');
  if (!button) return;
  button.addEventListener('click', () => {
    const status = $('#locate-status');
    if (status) status.textContent = 'Obtendo sua localização...';
    if (!navigator.geolocation) {
      if (status) status.textContent = 'Localização não autorizada. Selecione uma das unidades abaixo para traçar a rota.';
      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      currentUserLocation = { lat: coords.latitude, lng: coords.longitude };
      const nearest = nearestUnitTo(currentUserLocation);
      if (!nearest) {
        if (status) status.textContent = 'Não foi possível encontrar as unidades. Selecione uma unidade abaixo para traçar a rota.';
        return;
      }
      const distance = nearest.distance.toFixed(1).replace('.', ',');
      if (status) status.textContent = `Você está a ~${distance} km da ${nearest.unit.name}!`;
      selectUnitForRoute(nearest.unit, { origin: currentUserLocation, isNearest: true });
    }, () => {
      currentUserLocation = null;
      if (status) status.textContent = 'Localização não autorizada. Selecione uma das unidades abaixo para traçar a rota.';
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  });
}

function initializeUnitMap() {
  const firstUnit = unicfitData.units.find((unit) => Number.isFinite(unit.lat) && Number.isFinite(unit.lng));
  if (firstUnit) updateMapAndRoute(firstUnit, null);
}

function bindFloatingButton() {
  const button = $('#btn-whatsapp-floating');
  if (!button) return;
  const updateVisibility = () => {
    const visible = window.scrollY > 240;
    button.classList.toggle('is-visible', visible);
    button.hidden = !visible;
    button.style.display = visible ? '' : 'none';
    button.setAttribute('aria-hidden', String(!visible));
  };
  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
}

function init() {
  bindMobileMenu();
  bindSmoothScroll();
  bindFaq();
  bindPlanSelection();
  bindWhatsAppCtas();
  bindUnitChoices();
  bindUserLocation();
  initializeUnitMap();
  bindFloatingButton();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}

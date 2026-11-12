import { unicfitData, findPlan, findUnit } from '../data/unicfitData.js';
import { getWhatsAppAction } from './whatsapp.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function calculateDistanceKm(from, to) {
  if (!from || !to) return Infinity;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const sinHalfDLat = Math.sin(dLat / 2);
  const sinHalfDLng = Math.sin(dLng / 2);

  const haversine =
    sinHalfDLat * sinHalfDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinHalfDLng * sinHalfDLng;

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
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;
}

function headerOffset() {
  return ($('header') ?? $('.site-header') ?? $('.header'))?.getBoundingClientRect().height ?? 0;
}

function scrollToSection(target) {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset() - 16;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: reducedMotion ? 'auto' : 'smooth',
  });
}

function bindMobileMenu() {
  const button = $('#btn-mobile-menu');
  const menu = $('#mobile-menu');
  if (!button || !menu) return;

  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    menu.hidden = !open;
  };

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
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
    const subject = planName ? `Olá, gostaria de saber mais informações sobre os planos e a academia (interesse no ${planName}).` : undefined;
    const action = getWhatsAppAction(planId, button.dataset.unit, subject);
    window.open(action.url, '_blank', 'noopener,noreferrer');
  });
}

function bindWhatsAppCtas() {
  const selectors = '#btn-cta-hero, #btn-whatsapp-floating, .btn-whatsapp, a[href*="wa.me"]';
  $$(selectors).forEach((button) => {
    button.addEventListener('click', (event) => {
      const plan = button.dataset.plan;
      const unit = button.dataset.unit;
      const subject = button.dataset.subject;
      const action = getWhatsAppAction(plan, unit, subject);
      if (action.available) {
        event.preventDefault();
        window.open(action.url, '_blank', 'noopener,noreferrer');
      }
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
    mapFrame.title = `Mapa da ${unit.name} em Macapá`;
  }
  const routeLink = $('#btn-open-route');
  if (routeLink) {
    routeLink.href = unit.mapsUrl || buildGoogleMapsRouteUrl(origin, unit.address);
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

function bindThemeSwitcher() {
  const choices = $$('[data-theme-choice]');
  if (!choices.length) return;
  const supportedThemes = new Set(choices.map((button) => button.dataset.themeChoice));
  let savedTheme = 'signature';
  try {
    const storedTheme = localStorage.getItem('unicfit-theme');
    if (supportedThemes.has(storedTheme)) savedTheme = storedTheme;
  } catch { /* Storage can be unavailable in private browsing contexts. */ }

  const applyTheme = (theme) => {
    if (!supportedThemes.has(theme)) return;
    document.documentElement.dataset.theme = theme;
    choices.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
    try { localStorage.setItem('unicfit-theme', theme); } catch { /* Theme remains active for this page view. */ }
  };

  choices.forEach((button) => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice)));
  applyTheme(savedTheme);
}

function init() {
  bindThemeSwitcher();
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

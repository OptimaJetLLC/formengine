const OPEN_CLASS = 'fe-nav-open';
const TOGGLE_ID = 'fe-nav-toggle';
const BACKDROP_ID = 'fe-nav-backdrop';
const SIDEBAR_ID = 'docs-sidebar-island';
const MOBILE_NAV_QUERY = '(width <= 900px)';

function getToggle(): HTMLButtonElement | null {
  const toggle = document.getElementById(TOGGLE_ID);
  return toggle instanceof HTMLButtonElement ? toggle : null;
}

function getBackdrop(): HTMLButtonElement | null {
  const backdrop = document.getElementById(BACKDROP_ID);
  return backdrop instanceof HTMLButtonElement ? backdrop : null;
}

function getSidebar(): HTMLElement | null {
  return document.getElementById(SIDEBAR_ID);
}

function isMobileNav(): boolean {
  return window.matchMedia(MOBILE_NAV_QUERY).matches;
}

function isNavOpen(): boolean {
  return document.documentElement.classList.contains(OPEN_CLASS);
}

function syncInert(open: boolean): void {
  const shouldInert = open && isMobileNav();
  document.querySelector('.fe-content')?.toggleAttribute('inert', shouldInert);
  document.querySelector('.fe-toc')?.toggleAttribute('inert', shouldInert);
  document.querySelector('footer')?.toggleAttribute('inert', shouldInert);
}

function syncSidebarAria(open: boolean): void {
  const sidebar = getSidebar();
  if (!sidebar) {
    return;
  }

  const hide = isMobileNav() && !open;
  sidebar.toggleAttribute('inert', hide);

  if (hide) {
    sidebar.setAttribute('aria-hidden', 'true');
    return;
  }

  sidebar.removeAttribute('aria-hidden');
}

function setOpen(open: boolean, options?: {restoreFocus?: boolean}): void {
  const toggle = getToggle();
  const backdrop = getBackdrop();
  const sidebar = getSidebar();
  document.documentElement.classList.toggle(OPEN_CLASS, open);

  if (toggle) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  if (backdrop) {
    backdrop.hidden = !open;
  }

  syncSidebarAria(open);
  syncInert(open);

  if (open) {
    const firstLink = sidebar?.querySelector<HTMLElement>('a.fe-sidebar__link');
    firstLink?.focus();
    return;
  }

  if (options?.restoreFocus && toggle && isMobileNav()) {
    toggle.focus();
  }
}

function closeMobileNav(options?: {restoreFocus?: boolean}): void {
  if (isNavOpen()) {
    setOpen(false, options);
  }
}

function toggleMobileNav(): void {
  if (!isMobileNav()) {
    return;
  }
  setOpen(!isNavOpen());
}

function onDocumentClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (target.closest(`#${TOGGLE_ID}`)) {
    toggleMobileNav();
    return;
  }

  if (target.closest(`#${BACKDROP_ID}`)) {
    closeMobileNav({restoreFocus: true});
    return;
  }

  if (isNavOpen() && target.closest(`#${SIDEBAR_ID} a.fe-sidebar__link`)) {
    closeMobileNav();
  }
}

function onDocumentKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && isNavOpen()) {
    closeMobileNav({restoreFocus: true});
  }
}

function initMobileNav(): void {
  if (document.documentElement.dataset.mobileNavReady === 'true') {
    if (!isMobileNav()) {
      closeMobileNav();
    }
    syncSidebarAria(isNavOpen());
    return;
  }

  document.documentElement.dataset.mobileNavReady = 'true';
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('astro:page-load', () => {
    closeMobileNav();
    syncSidebarAria(false);
  });
  window.matchMedia(MOBILE_NAV_QUERY).addEventListener('change', (event) => {
    if (!event.matches) {
      closeMobileNav();
    }
    syncSidebarAria(isNavOpen());
  });
  syncSidebarAria(false);
}

initMobileNav();

import { navigate } from 'astro:transitions/client';
import { buildGuidePageUrl, getGuideBasePath, normalizeGuidePath } from './docs-sidebar-path';

const SCROLL_KEY = 'fe-docs-sidebar-scroll';
const ISLAND_ID = 'docs-sidebar-island';
const ACTIVE_LINK_SCROLL_PADDING = 8;

interface NavPage {
  slug: string;
  label: string;
  description?: string;
}

interface NavSection {
  slug: string;
  label: string;
  description?: string;
  pages: NavPage[];
}

interface NavHome {
  slug: string;
  label: string;
  description?: string;
}

interface NavPayload {
  base: string;
  home?: NavHome;
  sections: NavSection[];
}

function getIsland(): HTMLElement | null {
  return document.getElementById(ISLAND_ID);
}

function getBasePath(): string {
  return document.documentElement.dataset.guideBase ?? '/';
}

function getNavPayload(): NavPayload | null {
  const dataElement = document.getElementById('docs-nav-data');
  if (!dataElement?.textContent) {
    return null;
  }

  try {
    return JSON.parse(dataElement.textContent) as NavPayload;
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Builds a `title` attribute from a page description.
 * @param description page frontmatter description
 * @returns HTML attribute string, or an empty string when description is missing
 */
function titleAttr(description: string | undefined): string {
  return description ? ` title="${escapeHtml(description)}"` : '';
}

const HOME_ICON = `<svg class="fe-sidebar__home-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M3 11.5L12 4l9 7.5"></path>
  <path d="M5 10.5V20h14v-9.5"></path>
</svg>`;

function renderNavHtml(payload: NavPayload): string {
  const homeHref = buildGuidePageUrl('index', payload.base);
  const homeLabel = payload.home?.label ?? 'Home';
  const sections = payload.sections
    .map((section) => {
      const pages = section.pages
        .map((page) => {
          const href = buildGuidePageUrl(page.slug, payload.base);
          const title = titleAttr(page.description);
          return `<li><a href="${escapeHtml(href)}" class="fe-sidebar__link"${title}>${escapeHtml(page.label)}</a></li>`;
        })
        .join('');

      const sectionHref = buildGuidePageUrl(section.slug, payload.base);
      const sectionTitle = titleAttr(section.description);
      return `<section class="fe-sidebar__section">
        <a href="${escapeHtml(sectionHref)}" class="fe-sidebar__link fe-sidebar__section-title"${sectionTitle}>${escapeHtml(section.label)}</a>
        <ul class="fe-sidebar__pages">${pages}</ul>
      </section>`;
    })
    .join('');

  const homeTitle = titleAttr(payload.home?.description);
  return `<nav class="fe-sidebar__nav">
    <a href="${escapeHtml(homeHref)}" class="fe-sidebar__link fe-sidebar__link--home"${homeTitle}>
      ${HOME_ICON}
      ${escapeHtml(homeLabel)}
    </a>
    ${sections}
  </nav>`;
}

function mountClientNav(): void {
  const island = getIsland();
  const payload = getNavPayload();
  if (!island || !payload || island.dataset.clientNav === 'true') {
    return;
  }

  island.innerHTML = renderNavHtml(payload);
  island.dataset.clientNav = 'true';
}

/**
 * Persists the sidebar scroll offset across client navigations.
 */
function saveSidebarScroll(): void {
  const island = getIsland();
  if (!island) {
    return;
  }
  sessionStorage.setItem(SCROLL_KEY, String(island.scrollTop));
}

/**
 * Restores the sidebar scroll offset after a client navigation.
 */
function restoreSidebarScroll(): void {
  const island = getIsland();
  if (!island) {
    return;
  }

  const stored = sessionStorage.getItem(SCROLL_KEY);
  if (stored === null) {
    return;
  }

  island.scrollTop = Number(stored);
}

/**
 * Updates active link styling to match the current guide pathname.
 */
function syncSidebarActiveState(): void {
  const basePath = getBasePath();
  const currentPath = normalizeGuidePath(window.location.pathname, basePath);

  document.querySelectorAll<HTMLAnchorElement>(`#${ISLAND_ID} .fe-sidebar__link`).forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) {
      return;
    }

    const linkPath = normalizeGuidePath(new URL(href, window.location.origin).pathname, basePath);
    const isHome = linkPath === '/' || linkPath === '/index';
    const isActive = isHome
      ? currentPath === '/' || currentPath === '/index'
      : currentPath === linkPath;

    link.classList.toggle('is-active', isActive);
  });
}

function revealActiveLink(): void {
  const island = getIsland();
  const activeLink = island?.querySelector<HTMLElement>('.fe-sidebar__link.is-active');
  if (!island || !activeLink) {
    return;
  }

  const islandRect = island.getBoundingClientRect();
  const activeRect = activeLink.getBoundingClientRect();
  const visibleTop = islandRect.top + ACTIVE_LINK_SCROLL_PADDING;
  const visibleBottom = islandRect.bottom - ACTIVE_LINK_SCROLL_PADDING;

  if (activeRect.top < visibleTop) {
    island.scrollTop += activeRect.top - visibleTop;
  } else if (activeRect.bottom > visibleBottom) {
    island.scrollTop += activeRect.bottom - visibleBottom;
  }
}

function isInternalGuideLink(anchor: HTMLAnchorElement): boolean {
  const basePath = getGuideBasePath(getBasePath());
  try {
    const url = new URL(anchor.href, window.location.origin);
    if (url.origin !== window.location.origin) {
      return false;
    }
    const baseUrl = new URL(basePath, window.location.origin);
    return url.pathname.startsWith(baseUrl.pathname);
  } catch {
    return false;
  }
}

function bindScrollTracking(): void {
  const island = getIsland();
  if (!island || island.dataset.scrollBound === 'true') {
    return;
  }

  island.dataset.scrollBound = 'true';
  island.addEventListener('scroll', () => saveSidebarScroll(), { passive: true });
}

async function handleSidebarClick(event: MouseEvent): Promise<void> {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const link = (event.target as Element).closest(`#${ISLAND_ID} a.fe-sidebar__link`);
  if (!(link instanceof HTMLAnchorElement) || !isInternalGuideLink(link)) {
    return;
  }

  event.preventDefault();
  saveSidebarScroll();
  await navigate(link.href);
}

function refreshSidebarIsland(): void {
  mountClientNav();
  bindScrollTracking();
  restoreSidebarScroll();
  syncSidebarActiveState();
  revealActiveLink();
}

function initDocsSidebarNav(): void {
  if (document.documentElement.dataset.sidebarNavReady === 'true') {
    refreshSidebarIsland();
    return;
  }

  document.documentElement.dataset.sidebarNavReady = 'true';
  document.addEventListener('click', (event) => {
    void handleSidebarClick(event);
  });
  document.addEventListener('astro:before-preparation', saveSidebarScroll);
  document.addEventListener('astro:after-swap', refreshSidebarIsland);
  document.addEventListener('astro:page-load', refreshSidebarIsland);
  refreshSidebarIsland();
}

initDocsSidebarNav();

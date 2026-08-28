const LOUPE_SIZE = 168;
const ZOOM = 2.25;
const LONG_PRESS_MS = 350;
const MOVE_CANCEL_PX = 12;
const PREFETCH_CONCURRENCY = 2;
const PREFETCH_IDLE_TIMEOUT_MS = 2000;
/** Prefetch when the preview is in view or within one viewport height below. */
const PREFETCH_ROOT_MARGIN = '0px 0px 100% 0px';
/** Lift the loupe above the finger so the magnified area stays visible. */
const TOUCH_LOUPE_OFFSET_Y = -(LOUPE_SIZE / 2 + 28);

interface GuideTarget {
  image: HTMLImageElement;
  wrapper: Element;
  themedWrapper: Element | null;
}

interface LightboxElements {
  closeButton: HTMLButtonElement;
  dialog: HTMLDialogElement;
  image: HTMLImageElement;
}

type ReadyCallback = () => void;

const loadedFullSources = new Set<string>();
const pendingFullSources = new Map<string, ReadyCallback[]>();
const prefetchQueue: string[] = [];
let idlePrefetchHandle: number | null = null;
let idlePrefetchTimeout: ReturnType<typeof setTimeout> | null = null;
let waitingForWindowLoad = false;
let prefetchActive = 0;
let nearViewportObserver: IntersectionObserver | null = null;
let lightboxBound = false;
let loupeBound = false;
let suppressLightboxClick = false;

function canHoverMagnify(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function getVisibleGuideImage(wrapper: Element): HTMLImageElement | null {
  const images = wrapper.querySelectorAll<HTMLImageElement>('img');
  for (const candidate of images) {
    if (candidate.offsetWidth > 0 && candidate.offsetHeight > 0) {
      return candidate;
    }
  }

  const light = wrapper.querySelector<HTMLImageElement>('.fe-theme-image__light');
  const dark = wrapper.querySelector<HTMLImageElement>('.fe-theme-image__dark');
  if (light && getComputedStyle(light).display !== 'none') {
    return light;
  }
  if (dark && getComputedStyle(dark).display !== 'none') {
    return dark;
  }
  return wrapper.querySelector<HTMLImageElement>('img');
}

function isGuideScreenshotImage(image: HTMLImageElement): boolean {
  const source = image.currentSrc || image.src;
  return source.includes('/assets/guide/');
}

function resolveFullScreenshotSrc(image: HTMLImageElement, themedWrapper: Element | null): string {
  if (themedWrapper) {
    const isDark = document.documentElement.classList.contains('dark');
    const themedFull = themedWrapper.getAttribute(isDark ? 'data-fe-full-dark' : 'data-fe-full-light');
    if (themedFull) {
      return themedFull;
    }
  }

  const guideWrapper = image.closest('.fe-guide-image');
  if (guideWrapper) {
    const guideFull = guideWrapper.getAttribute('data-fe-full-src');
    if (guideFull) {
      return guideFull;
    }
  }

  const source = image.currentSrc || image.src;
  if (source.includes('.preview.webp')) {
    return source.replace('.preview.webp', '.full.webp');
  }
  return source;
}

function findGuideTarget(node: EventTarget | null): GuideTarget | null {
  if (!(node instanceof Element)) {
    return null;
  }

  const themedWrapper = node.closest('.fe-theme-image');
  if (themedWrapper) {
    const themedImage = getVisibleGuideImage(themedWrapper);
    if (!themedImage) {
      return null;
    }
    return { image: themedImage, wrapper: themedWrapper, themedWrapper };
  }

  const guideWrapper = node.closest('.fe-guide-image');
  if (guideWrapper) {
    const guideImage = guideWrapper.querySelector<HTMLImageElement>('img');
    if (!guideImage) {
      return null;
    }
    return { image: guideImage, wrapper: guideWrapper, themedWrapper: null };
  }

  return null;
}

function getLightboxElements(): LightboxElements | null {
  const dialog = document.getElementById('fe-guide-image-lightbox');
  const image = document.getElementById('fe-guide-image-lightbox-img');
  const closeButton = document.getElementById('fe-guide-image-lightbox-close');
  if (!(dialog instanceof HTMLDialogElement) || !(image instanceof HTMLImageElement) || !(closeButton instanceof HTMLButtonElement)) {
    return null;
  }
  return { closeButton, dialog, image };
}

function closeLightbox({ dialog, image }: LightboxElements): void {
  if (dialog.open) {
    dialog.close();
  }
  image.removeAttribute('src');
  image.alt = '';
}

function openLightbox(image: HTMLImageElement, themedWrapper: Element | null): void {
  const lightbox = getLightboxElements();
  if (!lightbox) {
    return;
  }

  lightbox.image.src = resolveFullScreenshotSrc(image, themedWrapper);
  lightbox.image.alt = image.alt;
  if (!lightbox.dialog.open) {
    lightbox.dialog.showModal();
  }
}

function handleImageClick(event: MouseEvent): void {
  // A touch long-press suppresses the synthetic click that would otherwise open the lightbox.
  if (suppressLightboxClick) {
    suppressLightboxClick = false;
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (!(event.target instanceof Element)) {
    return;
  }

  const themedWrapper = event.target.closest('.fe-theme-image');
  if (themedWrapper) {
    const themedImage = getVisibleGuideImage(themedWrapper);
    if (themedImage) {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(themedImage, themedWrapper);
    }
    return;
  }

  const guideWrapper = event.target.closest('.fe-guide-image');
  if (guideWrapper) {
    const guideImage = guideWrapper.querySelector<HTMLImageElement>('img');
    if (guideImage) {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(guideImage, null);
    }
    return;
  }

  const image = event.target.closest('img');
  if (image instanceof HTMLImageElement && isGuideScreenshotImage(image)) {
    event.preventDefault();
    event.stopPropagation();
    openLightbox(image, null);
  }
}

function bindGuideImageLightbox(): void {
  if (lightboxBound) {
    return;
  }

  const lightbox = getLightboxElements();
  if (!lightbox) {
    return;
  }

  lightbox.closeButton.addEventListener('click', () => closeLightbox(lightbox));
  lightbox.dialog.addEventListener('click', (event) => {
    if (event.target === lightbox.dialog) {
      closeLightbox(lightbox);
    }
  });
  lightbox.dialog.addEventListener('cancel', () => closeLightbox(lightbox));
  document.addEventListener('click', handleImageClick, true);
  lightboxBound = true;
}

function prefetchFull(url: string, onReady?: ReadyCallback): void {
  if (loadedFullSources.has(url)) {
    onReady?.();
    return;
  }

  const pending = pendingFullSources.get(url);
  if (pending) {
    if (onReady) {
      pending.push(onReady);
    }
    return;
  }

  pendingFullSources.set(url, onReady ? [onReady] : []);
  const loader = new Image();
  loader.decoding = 'async';
  loader.fetchPriority = 'low';
  loader.onload = loader.onerror = () => {
    loadedFullSources.add(url);
    const waiters = pendingFullSources.get(url) ?? [];
    pendingFullSources.delete(url);
    for (const waiter of waiters) {
      waiter();
    }
  };
  loader.src = url;
}

function shouldSkipIdlePrefetch(): boolean {
  const navigatorWithConnection = navigator as Navigator & { connection?: { saveData?: boolean } };
  return Boolean(navigatorWithConnection.connection?.saveData);
}

function fullUrlForWrapper(wrapper: Element): string {
  if (wrapper.classList.contains('fe-theme-image')) {
    const isDark = document.documentElement.classList.contains('dark');
    return wrapper.getAttribute(isDark ? 'data-fe-full-dark' : 'data-fe-full-light') ?? '';
  }
  return wrapper.getAttribute('data-fe-full-src') ?? '';
}

function eachGuideImageWrapper(callback: (wrapper: Element) => void): void {
  document.querySelectorAll('.fe-theme-image').forEach(callback);
  document.querySelectorAll('.fe-guide-image').forEach((wrapper) => {
    if (!wrapper.closest('.fe-theme-image')) {
      callback(wrapper);
    }
  });
}

function pumpPrefetchQueue(): void {
  while (prefetchActive < PREFETCH_CONCURRENCY && prefetchQueue.length > 0) {
    const url = prefetchQueue.shift();
    if (!url || loadedFullSources.has(url) || pendingFullSources.has(url)) {
      continue;
    }

    prefetchActive += 1;
    prefetchFull(url, () => {
      prefetchActive -= 1;
      pumpPrefetchQueue();
    });
  }
}

function enqueuePrefetch(url: string): void {
  if (!url || loadedFullSources.has(url) || pendingFullSources.has(url) || prefetchQueue.includes(url)) {
    return;
  }
  prefetchQueue.push(url);
  pumpPrefetchQueue();
}

function observeNearViewportPrefetch(): void {
  if (typeof IntersectionObserver === 'undefined' || shouldSkipIdlePrefetch()) {
    return;
  }

  nearViewportObserver?.disconnect();
  prefetchQueue.length = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        enqueuePrefetch(fullUrlForWrapper(entry.target));
        observer.unobserve(entry.target);
      }
    },
    { root: null, rootMargin: PREFETCH_ROOT_MARGIN, threshold: 0 }
  );
  nearViewportObserver = observer;
  eachGuideImageWrapper((wrapper) => observer.observe(wrapper));
}

function scheduleNearViewportPrefetchAfterLoad(): void {
  const idleWindow = window as Window & {
    cancelIdleCallback?: (handle: number) => void;
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  };

  if (idlePrefetchHandle !== null) {
    idleWindow.cancelIdleCallback?.(idlePrefetchHandle);
    idlePrefetchHandle = null;
  }
  if (idlePrefetchTimeout !== null) {
    clearTimeout(idlePrefetchTimeout);
    idlePrefetchTimeout = null;
  }

  const startObserver = (): void => {
    idlePrefetchHandle = null;
    idlePrefetchTimeout = null;
    observeNearViewportPrefetch();
  };

  const scheduleIdle = (): void => {
    if (idleWindow.requestIdleCallback) {
      idlePrefetchHandle = idleWindow.requestIdleCallback(startObserver, { timeout: PREFETCH_IDLE_TIMEOUT_MS });
      return;
    }
    idlePrefetchTimeout = setTimeout(startObserver, 1);
  };

  if (document.readyState === 'complete') {
    scheduleIdle();
    return;
  }
  if (waitingForWindowLoad) {
    return;
  }

  waitingForWindowLoad = true;
  window.addEventListener(
    'load',
    () => {
      waitingForWindowLoad = false;
      scheduleIdle();
    },
    { once: true }
  );
}

function bindGuideImageLoupe(): void {
  const loupeElement = document.getElementById('fe-guide-image-loupe');
  if (!(loupeElement instanceof HTMLElement) || loupeBound) {
    return;
  }
  const loupe = loupeElement;

  let activeImage: HTMLImageElement | null = null;
  let activeFullSource = '';
  let activeWrapper: Element | null = null;
  let lastX = 0;
  let lastY = 0;
  const half = LOUPE_SIZE / 2;
  let loupeOffsetY = 0;
  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let touchPressActive = false;
  let touchLoupeArmed = false;
  let touchId: number | null = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let scrollLocked = false;
  let lockedScrollX = 0;
  let lockedScrollY = 0;

  function setLoupeActiveClass(active: boolean): void {
    activeWrapper?.classList.toggle('fe-guide-loupe-active', active);
  }

  function suppressNextLightboxClick(): void {
    suppressLightboxClick = true;
  }

  function clearLongPressTimer(): void {
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }

  function lockPageScroll(): void {
    if (scrollLocked) {
      return;
    }
    scrollLocked = true;
    lockedScrollX = window.scrollX;
    lockedScrollY = window.scrollY;
    document.documentElement.classList.add('fe-guide-loupe-scroll-lock');
    document.body.classList.add('fe-guide-loupe-scroll-lock');
    document.body.style.top = `-${lockedScrollY}px`;
  }

  function unlockPageScroll(): void {
    if (!scrollLocked) {
      return;
    }
    scrollLocked = false;
    document.documentElement.classList.remove('fe-guide-loupe-scroll-lock');
    document.body.classList.remove('fe-guide-loupe-scroll-lock');
    document.body.style.top = '';
    window.scrollTo(lockedScrollX, lockedScrollY);
  }

  function hideLoupe(): void {
    loupe.hidden = true;
    loupe.style.backgroundImage = '';
    setLoupeActiveClass(false);
    if (!touchPressActive) {
      activeImage = null;
      activeFullSource = '';
      activeWrapper = null;
      loupeOffsetY = 0;
    }
  }

  function endTouchPress(): void {
    clearLongPressTimer();
    touchPressActive = false;
    touchLoupeArmed = false;
    touchId = null;
    unlockPageScroll();
    hideLoupe();
    activeImage = null;
    activeFullSource = '';
    activeWrapper = null;
    loupeOffsetY = 0;
  }

  function paintLoupe(clientX: number, clientY: number, options: { clamp?: boolean } = {}): void {
    if (!activeImage || !activeFullSource || !loadedFullSources.has(activeFullSource)) {
      return;
    }

    const rect = activeImage.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) {
      return;
    }

    let x = clientX - rect.left;
    let y = clientY - rect.top;
    if (options.clamp) {
      x = Math.max(0, Math.min(rect.width, x));
      y = Math.max(0, Math.min(rect.height, y));
    } else if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      hideLoupe();
      return;
    }

    loupe.style.width = `${LOUPE_SIZE}px`;
    loupe.style.height = `${LOUPE_SIZE}px`;
    loupe.style.left = `${clientX - half}px`;
    loupe.style.top = `${clientY - half + loupeOffsetY}px`;
    loupe.style.backgroundImage = `url(${JSON.stringify(activeFullSource)})`;
    loupe.style.backgroundSize = `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;
    loupe.style.backgroundPosition = `${-x * ZOOM + half}px ${-y * ZOOM + half}px`;
    loupe.hidden = false;
  }

  function activateTouchLoupe(): void {
    if (!touchPressActive || !activeImage || !activeFullSource) {
      return;
    }

    touchLoupeArmed = true;
    loupeOffsetY = TOUCH_LOUPE_OFFSET_Y;
    setLoupeActiveClass(true);
    lockPageScroll();
    suppressNextLightboxClick();
    if (loadedFullSources.has(activeFullSource)) {
      paintLoupe(lastX, lastY, { clamp: true });
      return;
    }

    prefetchFull(activeFullSource, () => {
      if (touchLoupeArmed && activeFullSource) {
        paintLoupe(lastX, lastY, { clamp: true });
      }
    });
  }

  function onTouchStart(event: TouchEvent): void {
    if (event.touches.length !== 1) {
      if (touchPressActive) {
        endTouchPress();
      }
      return;
    }

    const touch = event.touches[0];
    const target = findGuideTarget(event.target);
    if (!touch || !target) {
      return;
    }

    const fullSource = resolveFullScreenshotSrc(target.image, target.themedWrapper);
    if (!fullSource) {
      return;
    }

    clearLongPressTimer();
    touchPressActive = true;
    touchLoupeArmed = false;
    touchId = touch.identifier;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    lastX = touch.clientX;
    lastY = touch.clientY;
    activeImage = target.image;
    activeFullSource = fullSource;
    activeWrapper = target.wrapper;
    loupeOffsetY = TOUCH_LOUPE_OFFSET_Y;

    // Prefetch as soon as the press begins.
    prefetchFull(fullSource);
    longPressTimer = setTimeout(activateTouchLoupe, LONG_PRESS_MS);
  }

  /**
   * Touch Events are required to block scrolling: preventDefault on PointerEvent
   * does not stop pan or zoom gestures.
   * @param event touch move event
   */
  function onTouchMove(event: TouchEvent): void {
    if (!touchPressActive) {
      return;
    }

    let touch: Touch | null = null;
    for (const candidate of event.touches) {
      if (candidate.identifier === touchId) {
        touch = candidate;
        break;
      }
    }
    if (!touch) {
      return;
    }

    lastX = touch.clientX;
    lastY = touch.clientY;
    if (!touchLoupeArmed) {
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (deltaX * deltaX + deltaY * deltaY > MOVE_CANCEL_PX * MOVE_CANCEL_PX) {
        // The user started scrolling before the long-press fired.
        endTouchPress();
      }
      return;
    }

    // Block page scroll for the rest of this gesture.
    if (event.cancelable) {
      event.preventDefault();
    }
    paintLoupe(touch.clientX, touch.clientY, { clamp: true });
  }

  function onTouchEnd(event: TouchEvent): void {
    if (!touchPressActive) {
      return;
    }

    for (const touch of event.changedTouches) {
      if (touch.identifier === touchId) {
        if (touchLoupeArmed) {
          suppressNextLightboxClick();
        }
        endTouchPress();
        return;
      }
    }
  }

  function onTouchCancel(): void {
    if (touchPressActive) {
      endTouchPress();
    }
  }

  function onPointerMove(event: PointerEvent): void {
    // Desktop hover loupe only; touch uses Touch Events above.
    if (!canHoverMagnify() || event.pointerType === 'touch') {
      return;
    }

    lastX = event.clientX;
    lastY = event.clientY;
    const hoverTarget = findGuideTarget(event.target);
    if (!hoverTarget) {
      if (!loupe.hidden && !touchLoupeArmed) {
        hideLoupe();
      }
      return;
    }

    const hoverFullSource = resolveFullScreenshotSrc(hoverTarget.image, hoverTarget.themedWrapper);
    if (!hoverFullSource) {
      hideLoupe();
      return;
    }

    activeImage = hoverTarget.image;
    activeFullSource = hoverFullSource;
    activeWrapper = hoverTarget.wrapper;
    loupeOffsetY = 0;
    if (!loadedFullSources.has(hoverFullSource)) {
      loupe.hidden = true;
      prefetchFull(hoverFullSource, () => {
        if (activeFullSource === hoverFullSource && !touchLoupeArmed) {
          paintLoupe(lastX, lastY);
        }
      });
      return;
    }

    paintLoupe(lastX, lastY);
  }

  function onContextMenu(event: MouseEvent): void {
    if ((touchPressActive || touchLoupeArmed) && findGuideTarget(event.target)) {
      event.preventDefault();
    }
  }

  function onScroll(): void {
    if (touchLoupeArmed) {
      return;
    }
    if (touchPressActive) {
      endTouchPress();
      return;
    }
    hideLoupe();
  }

  document.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
  // Non-passive: required to prevent scrolling once the loupe is armed.
  document.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
  document.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
  document.addEventListener('touchcancel', onTouchCancel, { passive: true, capture: true });
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('contextmenu', onContextMenu, true);
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('blur', endTouchPress);
  loupeBound = true;
}

function onGuidePageReady(): void {
  bindGuideImageLightbox();
  bindGuideImageLoupe();
  scheduleNearViewportPrefetchAfterLoad();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onGuidePageReady);
} else {
  onGuidePageReady();
}

document.addEventListener('astro:page-load', onGuidePageReady);

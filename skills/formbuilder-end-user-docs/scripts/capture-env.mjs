/**
 * Shared Playwright capture settings for designer-guide screenshots.
 * Layout stays at 1440×900 CSS pixels; PNG output is scaled for hi-res popups.
 */
export const GUIDE_CAPTURE_VIEWPORT = {width: 1440, height: 900};
export const GUIDE_CAPTURE_DEVICE_SCALE_FACTOR = 2;

/**
 * @param {import('playwright').Browser} browser
 */
export function createGuideCapturePage(browser) {
  return browser.newPage({
    viewport: GUIDE_CAPTURE_VIEWPORT,
    deviceScaleFactor: GUIDE_CAPTURE_DEVICE_SCALE_FACTOR,
  });
}

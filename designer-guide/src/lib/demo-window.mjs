/**
 * Inline script for opening FormEngine demo deep links in a minimal popup window.
 * Loaded once from {@link ../layouts/DocsLayout.astro}.
 */
export const demoWindowScript = `(function () {
  function openMinimalWindow(url) {
    var windowFeatures =
      'width=1200,height=800,toolbar=no,menubar=no,location=no,status=no,directories=no,resizable=yes,scrollbars=yes';
    var win = window.open(url, 'formEngineDemo', windowFeatures);
    if (win) {
      win.opener = null;
    }
  }

  window.openMinimalWindow = openMinimalWindow;
})();`;

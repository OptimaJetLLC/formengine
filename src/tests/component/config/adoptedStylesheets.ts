export const mockAdoptedStyles = () => {
  if (!document.adoptedStyleSheets) {
    Object.defineProperty(document, 'adoptedStyleSheets', {
      value: [],
      writable: true
    })
  }
}

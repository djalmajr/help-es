export function useSheet(sheet: CSSStyleSheet, target: Document | ShadowRoot = document) {
  if (!target.adoptedStyleSheets.includes(sheet)) {
    target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet];
  }
}

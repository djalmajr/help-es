interface Document {
  adoptedStyleSheets: any[];
}

interface ShadowRoot {
  adoptedStyleSheets: any[];
}

interface CSSStyleSheet {
  replaceSync(css: string): void;
}

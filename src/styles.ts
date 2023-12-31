const isFrag = (n: Node) => {
  return [Node.DOCUMENT_FRAGMENT_NODE, Node.DOCUMENT_NODE].includes(n.nodeType as never);
};

export function css(arr: TemplateStringsArray, ...val: unknown[]) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(val.reduce((r: string, v, i) => r + v + arr[i + 1], arr[0]) as string);
  return sheet;
}

export function addStyle(
  sheets: CSSStyleSheet | CSSStyleSheet[],
  target: Document | ShadowRoot | HTMLElement = document,
) {
  const styles = (<CSSStyleSheet[]>[]).concat(sheets);
  while (!isFrag(target)) target = <Document>(target.parentNode || document);
  styles.forEach((sheet) => {
    const arr = (<Document>target).adoptedStyleSheets || [];
    if (!arr.includes(sheet)) (<Document>target).adoptedStyleSheets = [...arr, sheet];
  });
  return () => {
    const arr = (<Document>target).adoptedStyleSheets;
    arr.forEach((sheet, idx, arr) => styles.includes(sheet) && arr.splice(idx, 1));
  };
}

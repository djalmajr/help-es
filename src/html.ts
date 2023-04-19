import { Obj } from './types';

const prefix = 'δ';
const isAttr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
const hasPfx = (str: string | null) => str?.search(prefix) !== -1;
const create = (tag: string, obj: Obj) => Object.assign(document.createElement(tag), obj);

export function html(strings: string[], ...values: unknown[]) {
  const tmpl = values.reduce((r: string, _, i) => {
    return `${r}${isAttr.test(r) ? prefix + i : `<!--${prefix + i}-->`}${strings[i + 1]}`;
  }, strings[0]);

  const root: Element = create('template', { innerHTML: tmpl }).content;
  const walker = document.createTreeWalker(root, 1 | 128); // comment + element

  let idx = 0;
  let attr: string;
  let node: Element;

  while (idx < values.length) {
    if (!(node = walker.nextNode() as Element)) break;
    if (node.nodeType === Node.ELEMENT_NODE) {
      const attrs = node.getAttributeNames().filter((n) => hasPfx(node.getAttribute(n)!));
      for (attr of attrs) {
        if (attr[0] === "@") (node as Obj)[`on${attr.slice(1)}`] = values[idx++];
        else if (attr[0] === "?") node.toggleAttribute(attr.slice(1), !!values[idx++]);
        else if (attr[0] === ".") (node as Obj)[attr.slice(1)] = values[idx++];
        else { node.setAttribute(attr, values[idx++] as never); continue; } // prettier-ignore
        node.removeAttribute(attr);
      }
    } else if (node.nodeType === Node.COMMENT_NODE && hasPfx(node.textContent)) {
      const val = values[idx++];
      if (val instanceof NodeList) render(node, val as never);
      else node.parentNode?.insertBefore(document.createTextNode(val as never), node);
    }
  }

  return root.childNodes;
}

export function render(where: Element, what: ChildNode[]) {
  if (where.nodeType === Node.ELEMENT_NODE) where.replaceChildren(...what);
  else for (const node of what) where.parentNode?.insertBefore(node, where);
}

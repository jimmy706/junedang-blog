import { parseFragment, serialize, type DefaultTreeAdapterTypes as Tree } from "parse5";

function textOf(node: Tree.Node): string {
  if ("value" in node) return node.value;
  return "childNodes" in node ? node.childNodes.map(textOf).join("") : "";
}

export function prepareArticleHeading(html: string, title?: string) {
  const fragment = parseFragment(html);
  const headings: Tree.Element[] = [];
  function visit(node: Tree.Node) {
    if ("tagName" in node && node.tagName === "h1") headings.push(node);
    if ("childNodes" in node) node.childNodes.forEach(visit);
  }
  visit(fragment);
  if (!headings.length) return {};

  const normalize = (text: string) => text.replace(/\s+/g, " ").trim().toLowerCase();
  const matching = title
    ? headings.find(heading => normalize(textOf(heading)) === normalize(title))
    : headings[0];
  for (const heading of headings) {
    if (heading === matching && heading.parentNode) {
      const siblings = heading.parentNode.childNodes;
      siblings.splice(siblings.indexOf(heading), 1);
    } else {
      heading.tagName = heading.nodeName = "h2";
    }
  }
  return {
    articleBody: serialize(fragment),
    articleTitle: title || (matching && textOf(matching)),
    titleId: matching?.attrs.find(attr => attr.name === "id")?.value
  };
}

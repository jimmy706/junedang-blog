export type SanitizeHtmlOptions = {
  allowSvg?: boolean;
};

export const sanitizeHtml = (input: string, options?: SanitizeHtmlOptions): string => {
  if (!input) {
    return "";
  }

  let output = input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*(["']).*?\1/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/\s(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, ' $1="#"');

  if (!options?.allowSvg) {
    output = output
      .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
      .replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, "");
  }

  return output;
};

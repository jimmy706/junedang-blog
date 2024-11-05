export function constructArticleSlug(url?: string): string {
  if (!url) {
    return "";
  }
  const splits = url.split("/");
  const postHtml = splits[splits.length - 1];
  const postSlug = postHtml.split(".")[0];
  return `/posts/${postSlug}`;
}

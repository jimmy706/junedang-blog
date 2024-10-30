import { env } from "$env/dynamic/private";

export const load = async ({ params }) => {
  const { slug } = params;
  const blogPostUrl = `${env.API_URL}/${slug}.html`;
  return { slug, blogPostUrl };
};

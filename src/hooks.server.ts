import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  console.info(`${event.request.method}: ${event.url.pathname}`);
  if (event.url.pathname === "/") {
    redirect(302, "/posts");
  }
  return await resolve(event);
}

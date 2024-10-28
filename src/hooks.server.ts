/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  console.info(`${event.request.method}: ${event.url.pathname}`);
  return await resolve(event);
}

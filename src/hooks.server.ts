import { MAINTENANCE_MODE } from "$env/static/private";

/** @type {import('@sveltejs/kit').Handle} */
// src/hooks/+server.js
export async function handle({ event, resolve }) {
  console.info(`${event.request.method}: ${event.url.pathname}`);
  // const maintenanceMode = Boolean(MAINTENANCE_MODE);

  // if (maintenanceMode && event.url.pathname !== "/maintenance" &&   ) {
  //   // Redirect to the maintenance page if it's not already on the maintenance page
  //   console.info(`Under maintenance mode. Requested path ${event.url.pathname} will redirect to /maintenance`);
  //   return Response.redirect("/maintenance", 200);
  // }

  // Proceed with the request if not in maintenance mode or already on the maintenance page
  return await resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  console.info(`${event.request.method}: ${event.url.pathname}`);
  
  const response = await resolve(event);
  
  // Add security headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https: http:; " +
    "font-src 'self'; " +
    "connect-src 'self' https://www.google-analytics.com; " +
    "frame-src 'none'; " +
    "object-src 'none'; " +
    "base-uri 'self';"
  );
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  return response;
}

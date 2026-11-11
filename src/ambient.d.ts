// Keep the existing dynamic environment imports typed during the Kit 3 transition.
declare module '$env/dynamic/private' {
	export const env: typeof import('$app/env/private');
}

declare module '$env/dynamic/public' {
	export const env: typeof import('$app/env/public');
}

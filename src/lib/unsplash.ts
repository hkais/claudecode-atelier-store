// Shared by next.config.ts (remotePatterns) and the sample catalog, so the
// query string on every image URL always matches the allowed pattern exactly.
export const UNSPLASH_SEARCH = "?auto=format&fit=crop&w=2000&q=80";

export function unsplash(photoId: string) {
  return `https://images.unsplash.com/photo-${photoId}${UNSPLASH_SEARCH}`;
}

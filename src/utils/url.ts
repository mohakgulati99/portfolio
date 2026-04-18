/**
 * Prepends Astro's BASE_URL to an internal path.
 * When base is '/' (custom domain, no subpath), this is a no-op.
 * When base is '/portfolio/', links resolve to /portfolio/work etc.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

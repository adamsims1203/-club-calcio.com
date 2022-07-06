const localUrl = `http://localhost:3000`;
const remoteUrl = `https://calcio.fly.dev/`;
const baseUrl =
  window?.location?.hostname === "localhost" ? localUrl : remoteUrl;

export function resolveProductionUrl(doc) {
  const slug = doc?.slug?.current;

  if (!slug) {
    throw new Error(`Document has no slug, cannot preview`);
  }

  const url = new URL(baseUrl);
  url.pathname = slug;
  url.searchParams.set(`preview`, `9M5jkVuQ4DqS37Npq6`);

  return url.toString();
}

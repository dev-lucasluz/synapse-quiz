export interface AcceptItem {
  type: string;
  subtype: string;
  q: number;
  specificity: number;
}

export function parseAcceptHeader(acceptHeader: string | null): AcceptItem[] {
  if (!acceptHeader) return [];
  return acceptHeader
    .split(",")
    .map((item) => {
      const parts = item.trim().split(";");
      const mime = parts[0]?.trim().toLowerCase();
      if (!mime) return null;
      const [type, subtype] = mime.split("/");
      if (!type || !subtype) return null;
      let q = 1.0;
      for (let i = 1; i < parts.length; i++) {
        const param = parts[i].trim();
        if (param.startsWith("q=")) {
          const parsed = parseFloat(param.slice(2));
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
            q = parsed;
          }
        }
      }
      let specificity = 0;
      if (type !== "*") specificity += 1;
      if (subtype !== "*") specificity += 2;
      return { type, subtype, q, specificity };
    })
    .filter((x): x is AcceptItem => x !== null);
}

function matchMedia(item: AcceptItem, targetType: string, targetSubtype: string): boolean {
  const typeMatch = item.type === "*" || item.type === targetType;
  const subtypeMatch = item.subtype === "*" || item.subtype === targetSubtype;
  return typeMatch && subtypeMatch;
}

export function getMediaScore(
  items: AcceptItem[],
  targetType: string,
  targetSubtype: string
): { q: number; specificity: number } | null {
  let best: { q: number; specificity: number } | null = null;
  for (const item of items) {
    if (matchMedia(item, targetType, targetSubtype)) {
      if (item.q <= 0) continue; // explicit rejection
      if (!best || item.q > best.q || (item.q === best.q && item.specificity > best.specificity)) {
        best = { q: item.q, specificity: item.specificity };
      }
    }
  }
  return best;
}

export function prefersMarkdown(acceptHeader: string | null, pathname: string): boolean {
  if (pathname.endsWith(".md")) return true;
  if (!acceptHeader) return false;

  const items = parseAcceptHeader(acceptHeader);
  if (items.length === 0) return false;

  const mdScore = getMediaScore(items, "text", "markdown");
  const htmlScore = getMediaScore(items, "text", "html");

  if (!mdScore) return false;
  if (!htmlScore) return true;

  if (mdScore.q > htmlScore.q) return true;
  if (htmlScore.q > mdScore.q) return false;

  // If q-values are equal: check specificity (e.g. text/markdown vs */*)
  return mdScore.specificity > htmlScore.specificity;
}

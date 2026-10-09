import { defaultContent } from "../content/defaultContent.js";
import {
  deleteHomeContent,
  findHomeContent,
  saveHomeContent,
} from "../repo/ContentRepository.js";

const CACHE_TTL_MS = 10_000;
let cache;

function mergeContent(base, saved) {
  if (Array.isArray(base) || Array.isArray(saved)) return saved ?? base;
  if (base && typeof base === "object" && saved && typeof saved === "object") {
    const merged = { ...base };
    for (const key of Object.keys(saved)) {
      merged[key] = mergeContent(base[key], saved[key]);
    }
    return merged;
  }
  return saved ?? base;
}

export async function getContent() {
  if (cache && Date.now() - cache.cachedAt < CACHE_TTL_MS) {
    return cache.content;
  }

  const document = await findHomeContent();
  const content = document
    ? mergeContent(defaultContent, document.data)
    : defaultContent;
  cache = { content, cachedAt: Date.now() };
  return content;
}

export async function saveContent(data) {
  await saveHomeContent(data);
  cache = undefined;
}

export async function resetContent() {
  await deleteHomeContent();
  cache = undefined;
}

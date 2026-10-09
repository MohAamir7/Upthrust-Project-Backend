import {
  getContent,
  resetContent,
  saveContent,
} from "../FormService/ContentService.js";

export async function readContent(req, res) {
  res.set("Cache-Control", "no-cache");
  return res.json({ ok: true, content: await getContent() });
}

export async function updateContent(req, res) {
  await saveContent(req.validatedContent);
  return res.json({ ok: true, content: await getContent() });
}

export async function restoreDefaultContent(req, res) {
  await resetContent();
  return res.json({ ok: true, content: await getContent() });
}

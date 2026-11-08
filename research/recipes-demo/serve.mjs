// Static server for the local recipes demo (research/ is not in git).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const types = { ".html": "text/html", ".svg": "image/svg+xml", ".js": "text/javascript", ".css": "text/css" };
createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  try {
    const body = await readFile(join(root, path.endsWith("/") ? `${path}index.html` : path));
    res.writeHead(200, { "content-type": types[extname(path) || ".html"] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(Number(process.env.PORT ?? 4173), () => console.log(`recipes demo on http://localhost:${process.env.PORT ?? 4173}`));

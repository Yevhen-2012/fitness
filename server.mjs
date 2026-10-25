import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4174);
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.mp4':'video/mp4', '.webm':'video/webm', '.ttf':'font/ttf', '.otf':'font/otf', '.woff2':'font/woff2', '.json':'application/json' };

http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    let pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    if (pathname === '/fitness') { response.writeHead(301, { Location: '/fitness/' }); response.end(); return; }
    if (pathname.startsWith('/fitness/')) pathname = pathname.slice('/fitness'.length);
    const file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
    const info = await stat(file);
    const resolved = info.isDirectory() ? path.join(file, 'index.html') : file;
    const metadata = info.isDirectory() ? await stat(resolved) : info;
    const headers = { 'Content-Type': mime[path.extname(resolved)] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };
    let start = 0, end = metadata.size - 1, status = 200;
    if (request.headers.range) {
      const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range);
      if (!range) { response.writeHead(416); response.end(); return; }
      start = Number(range[1]); end = range[2] ? Math.min(Number(range[2]), end) : end;
      if (start > end) { response.writeHead(416, { 'Content-Range': `bytes */${metadata.size}` }); response.end(); return; }
      headers['Content-Range'] = `bytes ${start}-${end}/${metadata.size}`; status = 206;
    }
    headers['Content-Length'] = Math.max(0, end - start + 1);
    response.writeHead(status, headers);
    if (request.method === 'HEAD' || metadata.size === 0) response.end();
    else createReadStream(resolved, { start, end }).pipe(response);
  } catch (error) { response.writeHead(error.code === 'ENOENT' ? 404 : 400); response.end('Page not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Webflow standard: http://127.0.0.1:${port}/fitness/`));

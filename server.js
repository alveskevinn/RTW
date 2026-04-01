const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = 8080;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let file = req.url === '/' ? '/tv-dashboard.html' : req.url.split('?')[0];
  const filePath = path.join(DIR, file);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`[+] Client conectado (${clients.size} total)`);

  ws.on('message', (data) => {
    const msg = data.toString();
    console.log('[>]', msg);
    for (const c of clients) {
      if (c !== ws && c.readyState === 1) c.send(msg);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[-] Client desconectado (${clients.size} total)`);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Rotorwest TV Server rodando!\n`);
  console.log(`  TV Dashboard:  http://localhost:${PORT}/tv-dashboard.html`);
  console.log(`  Admin Panel:   http://localhost:${PORT}/tv-admin.html`);
  console.log(`  Site:          http://localhost:${PORT}/rotorwest-site.html\n`);
});

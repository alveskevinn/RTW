const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`[+] Client conectado (${clients.size} total)`);

  ws.on('message', (data) => {
    const msg = data.toString();
    console.log('[>] Mensagem:', msg);
    for (const c of clients) {
      if (c !== ws && c.readyState === 1) c.send(msg);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[-] Client desconectado (${clients.size} total)`);
  });
});

console.log('WebSocket server rodando em ws://localhost:8080');

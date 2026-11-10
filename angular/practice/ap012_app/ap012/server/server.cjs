const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const jsonServer = require('json-server');

const PORT = Number(process.env.PORT) || 3012; 
const DELAY_MS = 400;
const TOKEN_TTL_MS = 2 * 60 * 1000; 

const USERS = [
  { name: 'ada', password: 'angular', role: 'admin' },
  { name: 'uli', password: 'angular', role: 'user' },
];

// json-server writes every change into db.json. We keep db.seed.json as the clean
// original and create db.json from it on first start (db.json is git-ignored).
const dbFile = path.join(__dirname, 'db.json');
if (!fs.existsSync(dbFile)) fs.copyFileSync(path.join(__dirname, 'db.seed.json'), dbFile);

const sessions = new Map();

const server = jsonServer.create();
const router = jsonServer.router(dbFile);

server.use(jsonServer.defaults({ logger: true }));
server.use(jsonServer.bodyParser);

// server.use((req, res, next) => setTimeout(next, DELAY_MS));

// Simulated failures: /api/books?_fail=500
server.use((req, res, next) => {
  const status = Number(req.query._fail);
  if (status) return res.status(status).json({ message: `Simulated ${status} error` });
  next();
});

server.post('/api/login', (req, res) => {
  const { name, password } = req.body ?? {};
  const found = USERS.find((u) => u.name === name && u.password === password);
  if (!found) return res.status(401).json({ message: 'Wrong name or password' });

  const token = crypto.randomUUID();
  const user = { name: found.name, role: found.role };
  sessions.set(token, { user, expiresAt: Date.now() + TOKEN_TTL_MS });
  res.json({ token, user });
});

// Everything else under /api needs "Authorization: Bearer <token>".
server.use('/api', (req, res, next) => {
  const token = (req.headers.authorization ?? '').replace(/^Bearer /, '');
  const session = sessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return res.status(401).json({ message: 'Not logged in or session expired' });
  }
  if (req.method === 'DELETE' && session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins may delete' });
  }
  next();
});

server.use('/api', router);

server.listen(PORT, () => {
  console.log(`Fake API on http://localhost:${PORT}/api  (users: ada/angular = admin, uli/angular = user)`);
});

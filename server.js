const { createServer } = require('http');
const { parse } = require('url');
const compression = require('compression');
server.use(compression());
const next = require('next');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Add security headers
    helmet()(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});

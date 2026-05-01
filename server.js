const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 10000;
const TARGET = process.env.DATA_SOURCE_ENDPOINT; 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

http.createServer((req, res) => {
  // اضافه شده: بررسی مسیر برای نمایش صفحه وضعیت
  if (req.url === '/status' || req.url === '/check') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Project Status</title>
          <style>
              body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f2f5; }
              .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
              .status-ok { color: #2ecc71; font-weight: bold; }
              .info { color: #666; margin-top: 1rem; font-size: 0.9rem; }
          </style>
      </head>
      <body>
          <div class="card">
              <h1>Server is <span class="status-ok">ONLINE</span> 🚀</h1>
              <p>پروژه شما در ریپلوی (Railway/Render) با موفقیت در حال اجرا است.</p>
              <div class="info">Target Endpoint: ${TARGET ? 'Configured ✅' : 'Not Set ❌'}</div>
          </div>
      </body>
      </html>
    `);
  }

  // باقی کد بدون تغییر برای حفظ کارکرد پروکسی
  try {
    const url = new URL(TARGET);
    
    const options = {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: req.url,
      method: req.method,
      headers: { 
        ...req.headers, 
        'host': url.hostname,
        'connection': 'keep-alive'
      },
      timeout: 30000
    };

    const proxy = (url.protocol === 'https:' ? https : http).request(options, (remoteRes) => {
      res.writeHead(remoteRes.statusCode, remoteRes.headers);
      remoteRes.pipe(res);
    });

    proxy.on('error', (err) => {
      console.error('Proxy Detail Error:', err.message);
      if (!res.headersSent) {
        res.writeHead(502);
        res.end(`Error: ${err.message}`);
      }
    });

    req.pipe(proxy);
  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('URL Parsing Error or Target not defined');
    }
  }
}).listen(PORT, () => console.log(`Server is UP on port ${PORT}`));
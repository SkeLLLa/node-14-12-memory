const crypto = require('crypto');
setInterval(() => {
  const m = process.memoryUsage();
  const rss = Math.round((m.rss / 1024 / 1024) * 100) / 100;
  const heap = Math.round((m.heapUsed / 1024 / 1024) * 100) / 100;
  const heapT = Math.round((m.heapTotal / 1024 / 1024) * 100) / 100;
  // const ext = Math.round((m.arrayBuffers / 1024 / 1024) * 100) / 100;
  console.log(`rss:${rss}; heap: ${heap}; total: ${heapT}`);
}, 1000);

async function genData() {
  return JSON.stringify({
    a: Math.random(),
    b: crypto.randomBytes(32),
    c: {
      d: {
        e: crypto.randomBytes(Math.round(Math.random() * 20)),
      },
    },
  });
}

require('http')
  .createServer(async (req, res) => {
    const data = await genData();
    try {
      const x = JSON.parse(data);
      x.a += Math.random();
      x.b = 'xxx' + x.b + 'yyy';
      res.end(JSON.stringify(x));
    } catch (err) {
      res.end('');
    }
  })
  .listen(3000);

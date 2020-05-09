const got = require('got').default;

async function wait(t = 100) {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  });
}

(async () => {
  for (let i = 0; i < 10000; i++) {
    await got('http://localhost:3000/req');
    await wait(10);
    console.log(i);
  }
})();

const express = require('express')
const app = express()
const port = 3333

let countMaps = {
  "page": {},
  "favicon": {},
  "image": {}
};
let resourceFiles = {
  "page": "page.html",
  "favicon": "favicon.png",
  "image": "image.png"
};

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/resource', (req, res) => {
  let { key, type } = req.query;
  let countMap = countMaps[type];
  if (countMap[key]) {
    countMap[key] = countMap[key] + 1;
  } else {
    countMap[key] = 1;
  }
  res.set({
    "Cache-Control": "public, max-age=604800, immutable"
  });
  res.sendFile(resourceFiles[type], { root: __dirname });
});
app.get('/count', (req, res) => {
  let { key, type } = req.query;
  res.send(`${countMaps[type][key] || 0}`);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

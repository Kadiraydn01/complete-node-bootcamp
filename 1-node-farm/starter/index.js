const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemp = require("./modules/replaceTemp");
// const textFs = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textFs);

// const textOut = `This is what we know about the avocado: ${textFs}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//   });
// });
// console.log("Will read file!");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // HOME PAGE
  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = productData.map((el) => replaceTemp(tempCard, el));
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    //PRODUCT
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = productData[query.id];
    const output = replaceTemp(tempProduct, product);
    res.end(output);

    //APİ
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    //ERROR HANDLER
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>404 Page not found</h1>");
  }
});

//SERVER
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

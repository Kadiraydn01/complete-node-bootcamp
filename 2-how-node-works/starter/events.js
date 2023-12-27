const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("İndirim", () => {
  console.log("Vodafoneda indirim var");
});
myEmitter.on("İndirim", () => {
  console.log("Kampanyaaaa");
});
myEmitter.on("İndirim", (stok) => {
  console.log("Stokta " + stok + " ürün var");
});
myEmitter.emit("İndirim", 21);

const fs = require("fs");

setTimeout(() => console.log("Merhaba dadil"), 1000);
setImmediate(() => console.log("Merhaba dada"));
fs.readFile("test-file.txt", () => {
  console.log("Dosyaya bakıldı");
});

console.log("Burası ilk çıkmalı");

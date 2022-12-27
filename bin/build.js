const fs = require("fs");
const Px2rem = require("px2rem");
const px2remIns = new Px2rem({
  remUnit: 41.2,
});

fs.readFile("./src/style.css", function (err, data) {
  if (err) {
    return console.error(err);
  }
  const originCssText = data.toString();
  const newCssText = px2remIns.generateRem(originCssText);
  fs.writeFile("./dist/style.css", newCssText, (err) => {
    if (err) console.log(err);
  });
});

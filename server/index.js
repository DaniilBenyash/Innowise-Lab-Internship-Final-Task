const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/dist", "index.html"));
});

const port = 3000;
app.listen(port, () =>
  console.log(
    `Server initialized on: http://localhost:${port} // ${new Date()}`,
  ),
);

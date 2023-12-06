const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/start-bots", (req, res) => {
  const { pin, numBots } = req.body;

  const child = spawn("node", ["kahootbot.js", pin, numBots]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  res.send("Bots started");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

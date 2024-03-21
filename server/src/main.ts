import express from "express";
import path from "path";

const port = process.argv[2] ?? 8080;

const app = express();
const staticPath = path.resolve(__dirname, "client");

app.use("/", express.static(staticPath));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
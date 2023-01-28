const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const url = require("url");

const app = express();
const PORT = 5002;

const params = new url.URLSearchParams(payload);
console.log(params, "params");
const config = {
  method: "get",
  headers: {
    "Content-Type": "aplication/json",
  },
};

app.get("/weather", async (req, res, next) => {});

app.use(morgan("tiny"));

app.use((req, res) => {
  console.log(
    `${req.method} and ${req.originalUrl} and ${new Date().toISOString()}`
  );
});
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Server on ${PORT} done ${error}`);
  }
  console.log(`Server run on ${PORT}`);
});

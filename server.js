const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const url = require("url");
// const got = require("got");
// import("got").then((res) => {
//   const got = res;
// });
// (async () => {
//   const result = await import("got");
//   const { got } = result;
// })();
const app = express();
const PORT = 5002;

const URL = "https://api.weatherbit.io/v2.0/current";
const APIKEY = "68118a82122943ada7d1f328783c9c1d";
// const URLq = `https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${APIKEY}&include=minutely`;

// app.use(express.urlencoded({extended: true})) use for send data frome html form
// app.use(express.static("pablic")); //public folder and files
const payload = {
  lat: 35.7796,
  lon: -78.6382,
  key: APIKEY,
};
const params = new url.URLSearchParams(payload);
console.log(params, "params");
const config = {
  method: "get",
  headers: {
    "Content-Type": "aplication/json",
  },
};

app.get("/weather", async (req, res, next) => {
  console.log(`${URL}?${params}`, "<------data");
  try {
    // USE npm i got - but new version does not work in commonJS module
    //  const response = await got(URL, {
    //   searchParams: {
    //     lat: 35.7796,
    //     lon: -78.6382,
    //     key: APIKEY,
    //   },
    // });
    // USE fetch
    // const data = await fetch(
    //   "http://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=68118a82122943ada7d1f328783c9c1d"
    // );
    // USE axios
    const { data } = await axios(`${URL}?${params}`, config);
    return res.status(200).json({ data }, null, 2);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(morgan("tiny"));
// app.get("/home", (req, res, next) => {
//   console.log("Home");
//   console.dir(req.ip, " -- ip");
//   res.status(500).send(`${req.ip}<h1> express Home</h1>${req.originalUrl}`);
//   //   res.sendStatus(200);
//   next();
// });

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

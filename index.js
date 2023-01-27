const http = require("http");
const PORT = 3001;
const httpStatus = require("http-status-codes");
const hostname = "127.0.0.1";
const server = http.createServer().listen(PORT);

server.on("request", function (req, res) {
  if (req.url.indexOf("/home") >= 0) {
    res.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
    return res.end("<h1>Hello HOME Page</h1>");
  }
  //   for (let header in req.headers) {
  //     console.log(header + ": " + req.headers[header]);
  //   }
  console.log(req.method, "<--req.method");
  console.log(req.url, "--req.url");
  console.log(req.httpVersion, "--req.httpVersion");
  console.log("Resived an incoming Request");
  console.log(
    `Server is running at http://${hostname}:${req.socket.localPort}/`
  );
  console.log(req.socket, "<-req.socket");
  res.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
  res.end("<h1>Hello OLD</h1>");
});
// server.listen(PORT, hostname, () => {
//   console.log(`Server is running at http://${hostname}:${PORT}/`);
// });

// const server = http.createServer((req, res) => {
//   console.log("Resived an incoming Request");
//   res.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
//   let responseMessage = "<h1> Hello</h1>"; // write the response to the client
//   res.write(responseMessage);
//   res.end();
//   console.log(`send ${responseMessage}`);
// });

// server.listen(PORT, (error) => {
//   if (error) {
//     return console.error(error);
//   }
//   console.log(`Listen ${PORT}`);
// });

// const requestHandler = (request, response) => {
//     response.writeHead(200, { 'Content-type': 'text/html' });
//     response.end('<h1>Hello word</h1>')
// };

// http.createServer(requestHandler);

// var myHeaders = new Headers();
// myHeaders.append("apikey", "xKj4iNwLMu4aKPW4tJVYxTGJvGjYYa6A");

// var requestOptions = {
//   method: "GET",
//   redirect: "follow",
//   headers: myHeaders,
// };

// fetch("https://api.apilayer.com/tax_data/canada_rate_list", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result.data))
//   .catch((error) => console.log("error", error));

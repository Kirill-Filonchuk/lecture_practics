const { app, PORT } = require("./app");

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port ${PORT}`);
});

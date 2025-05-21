
// const app = require("./app");
// const config = require("./env");
// const PORT = process.env.PORT || 3000;

// app.listen(config.PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
  
  
// });

// const app = require("./app");
// const config = require("./env"); // load PORT from env.js

// app.listen(config.PORT, () => {
//   console.log(`Server running on http://localhost:${config.PORT}`);
// });


const app = require('./app');

const PORT = 3000; // hardcode port here to test

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

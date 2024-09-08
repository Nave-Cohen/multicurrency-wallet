const serverless = require("serverless-http");
const app = require("../server.js"); // Ensure the correct relative path to your Express app

module.exports = serverless(app);

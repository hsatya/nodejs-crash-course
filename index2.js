const path = require("path");
const fs = require("fs");
const Logger = require("./logger");

const logger = new Logger();

logger.on("message", (data) => {
  fs.appendFile(
    path.join(__dirname, "datalog", "logs.txt"),
    JSON.stringify(data),
    (err) => {
      if (err) throw err;
      console.log("Logs added to file");
    }
  );
});

logger.log("Hello World!");
logger.log("Hi");
logger.log("Hello");

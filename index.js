const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of the file
  let extName = path.extname(filePath);

  // Initial Content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //   const extNames = {
  //     ".html": "text/html",
  //     ".js": "text/javascript",
  //     ".css": "text/css",
  //     ".json": "application/json",
  //     ".png": "image/png",
  //     ".jpg": "image/jpg",
  //   };

  //   contentType = extNames[extName];

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // PAGE NOT FOUND
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

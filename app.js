const http = require('http'); // The main server package
const fs = require('fs'); // The file system package, used to deal with files


// To access the server from the browser use: 127.0.0.1:3000
const hostname = '127.0.0.1'; // The server IP
const port = process.env.PORT || 3000; // The server port

// Creating a server
const server = http.createServer((request, response) => {
  // Getting the requested URL from the browser
  let url = request.url;

  // The routing
  if(url === '/') { // The home page route
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // Sending an HTML file as a response
    fs.readFile('pages/index.html', null, function (error, data) {
      if (error) {
        response.writeHead(404);
        response.write('Whoops! Page not found!');
      } else {
        response.write(data);
      }
      response.end();
    });

  }else if(url ==='/about') { // The 'about' page route
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(`<div style="color: green;">This is my first NodeJS app</div>
             <div><a href="/">Return home</a></div>`);

  }else if(url ==='/api/users') { // The users API endpoint
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // The REST API normally sends a JSON response, or XML in some cases
    response.end(JSON.stringify({
                            first_user: "Ahmad",
                            second_user: "Khaled",
                            third_user: "Lama"
                          }));
  }
  else { // If the user entered a page that doesn't exist, send the 'page not found' response
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.end(`<div style="color: red;">Whoops! Page not found!</div>
             <div><a href="/">Return home</a></div>`);
  }
});

// Running the server
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const logger = function(){
    console.log(`Server running at http://${hostname}:${port}/`)
}

const server = http.createServer()

server.on('request', function(request, response){
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.write('<h1>Hello World</h1>');
  response.end('<footer>Andiamo collega</footer>');
})

server.listen(port, hostname, logger)
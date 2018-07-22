var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

function staticRoot(staticPath, req, res) {
  console.log(staticPath)
  console.log(req.url)
  var pathObj = url.parse(req.url, true)
  console.log(pathObj)

  if (pathObj.pathname === '/') {
    pathObj.pathname += 'test.html'
  }

  var filepath = path.join(staticPath, pathObj.pathname)

  fs.readFile(filepath, 'binary', function (err, fileContent) {
    if (err) {
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    } else {
      console.log('ok')
      res.writeHead(200, 'ok')
      res.write(fileContent, 'binary')
      res.end()
    }
  })

}
console.log(path.join(__dirname, 'sample'))

var server = http.createServer(function (req, res) {
  switch (req.url) {
    case '/123':
      res.end(JSON.stringify({
        a: 1,
        b: 2
      }))
      break;
    case '/456':
      res.end(fs.readFileSync(__dirname + '/sample/zye11/login.html'))
      break;
      defaulk:
        res.end(fs.readFileSync(__dirname + '/sample' + req.url))
  }
  staticRoot(path.join(__dirname, 'sample'), req, res)
})
server.listen(6324)
console.log('visit http://localhost:6324')



// var server = http.createServer(function (req, res) {
//   console.log('niming')
//   res.setHeader("Content-type", "text/html; charset=utf-8")
//   res.write('<h1>jind</h1>')
//   res.end()
// })n
// server.listen(6324)

// var server = http.createServer(function (request, response) {
//   setTimeout(function () {

//     response.setHeader('Content-type', 'text/html; charset=utf-8')
//     response.writeHead(200, 'ok')
//     response.write('<html><head><meta charset="gbk" /></head>')
//     response.write('<body>')
//     response.write('<h1>你好</h1>')
//     response.write('</body>')
//     response.write('</html>')

//     response.end()
//   }, 2000);
// })
// console.log('open http://localhost:6324')
// server.listen(6324)
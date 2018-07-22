# nodejs 实现后端服务器
- nodejs通过require加载http模块创建服务器
```
var http = require('http')
```
- path模块,自动识别url类型
```
var path = require('path')
```
- fs模块用于读写文件数据
```
var fs = require('fs')
```
- url模块自动解析url
```
var url = require('url')
```
- 将url解析成一个对象
```
var pathObj = url.parse(req.url, true)
```
- 将制定页面默认成主页
```
  if (pathObj.pathname === '/') {
    pathObj.pathname += 'test.html'
  }
```
- 获得绝对路径
```
var filepath = path.join(staticPath, pathObj.pathname)
```
- 异步读取文件用二进制方式
```
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
```
- 处理路由
```
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
```

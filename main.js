var express = require('express')
var app = express()
var settings = {
  port: 4533
}

app.use(express.static('./public', {
  index: '../main.html'
}))

app.listen(settings.port)

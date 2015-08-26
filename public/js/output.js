addEventListener('load', function () {
  output = outputer(document.getElementsByTagName('output')[0])
})

function outputer (parent) {
  return function (data, type) {
    var elem = document.createElement('p')
    var text = document.createTextNode(data)
    elem.className = type
    return parent.appendChild(deepAppend(elem, deepAppend(wrapType(type), text)))
  }
}

function wrapType (type) {
  var elem
  var types = {
    error: ['strong'],
    system: ['i'],
    message: ['span']
  }
  if(types[type]) types[type].forEach(function (tag) {
    var newElem = document.createElement(tag)
    elem ? elem.appendChild(newElem) : elem = newElem
  })
  return elem
}

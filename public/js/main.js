var socket = false
var outputElem

addEventListener('load', function () {
  outputElem = document.getElementsByTagName('output')[0]
})

document.getElementsByTagName('input')[0].addEventListener('keydown', function (e) {
  if(!isEnter(e.keyCode)) return
  if(
    DOMException.prototype
      .isPrototypeOf(
        socket = tryConnect(e.target.value)
      )
  )
    return outputElem.appendChild(
      output('WebSocket-connection failed: ' + socket, 'error')
    )

  outputElem.appendChild(output('Opening WebSocket...', 'system'))
  socket.addEventListener('message', function (e) {
    outputElem.appendChild(output(e.data, 'message'))
  })
  socket.addEventListener('error', function (e) {
    outputElem.appendChild(output(handleWebsocketError(e), 'error'))
  })
})

document.getElementsByTagName('textarea')[0].addEventListener('keydown', function (e) {
  interceptTab(e)
  if(!(isSocketOpen(socket) && isControlEnter(e))) return
  sendToSocket(socket, mayEval(e.target.value))
})

function mayEval (str) {
  try {
    return eval(str)
  } catch (e) {
    return str
  }
}

function isControlEnter (e) {
  return (e.ctrlKey || e.shiftKey) && isEnter(e.keyCode)
}

function isEnter (keyCode) {
  keyCode === 13
}

function sendToSocket (socket, text) {
  socket.send(text)
}

function output (data, type) {
  var elem = document.createElement('p')
  var text = document.createTextNode(data)
  elem.className = type
  return deepAppend(elem, deepAppend(wrapType(type), text))
}

function tryConnect (url) {
  try {
    return new WebSocket(url)
  } catch(e) {
    return e
  }
}

function handleWebsocketError (e) {
  console.log([e, e.eventPhase])
  if(e.eventPhase === 2) return 'Failed to connect'
}

function isSocketOpen (socket) {
  return WebSocket.prototype.isPrototypeOf(socket)
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

function deepAppend (target, elem) {
  target.children.length > 0 ?
    deepAppend(target.children[0], elem) :
    target.appendChild(elem)
  return target
}

function interceptTab (e) {
  var text
  var start
  if(e.keyCode !== 9) return
  start = e.target.selectionStart
  text = e.target.value
  e.preventDefault()
  e.target.value = [
    text.substr(0, start),
    text.substr(start)
  ].join('  ')
  e.target.selectionStart = start + 2
  e.target.selectionEnd = start + 2
}

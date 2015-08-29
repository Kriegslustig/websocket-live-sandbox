(function () {
  var socket = false
  var react
  var send

  addEventListener('submit-input', function (e) {
    if(is(socket = tryConnect(e.detail.value), Error.prototype)) {
      return output('WebSocket-connection failed: ' + socket, 'error')
    }

    output('Opening WebSocket...', 'system')
    socket.addEventListener('message', function (e) {
      output(e.data, 'message')
    })
    socket.addEventListener('error', function (e) {
      output(handleWebsocketError(e), 'error')
    })

    react = reacter(socket)
    send = sender(socket)
  })

  addEventListener('submit-textarea', function (e) {
    var text = e.detail.value
    if(isMarkedAsString(text)) {
      send(getMarkedString(text))
    } else {
      send(mayEval(text))
    }
  })

  function isMarkedAsString (str) {
    return str[0] === '-'
  }

  function getMarkedString (str) {
    return str.substr(1)
  }

  function mayEval (str) {
    try {
      return eval(str)
    } catch (e) {
      output(e, 'error')
    }
  }

  function sender (socket) {
    return function (str) {
      if(sendToSocket(socket, str)) output(str, 'system')
    }
  }

  function sendToSocket (socket, text) {
    if(!isSocketOpen(socket) || typeof text != 'string' || !text) return false
    socket.send(text)
    return true
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

  /*********************************************
   * Userspace
   *********************************************/

  function reacter (socket) {
    return function (condition, cb, err) {
      socket.addEventListener(
        err ?
          'error':
          'message',
        function (e) {
          if(!match(condition, e.data)) return
          cb(e.data)
        }
      )
      output('Added hook for ' + condition, 'system')
    }
  }
})()
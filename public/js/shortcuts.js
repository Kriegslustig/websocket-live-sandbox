(function () {
  var shortcuts = [
    ['ddp pong', 'react(\'ping\', function () { this.send(JSON.stringify({msg: \'pong\'})) })'],
    ['ddp connect', 'JSON.stringify({msg: \'connect\', version: \'1\', support: [\'1\']})'],
    ['ddp msg', 'JSON.stringify({msg: \'\'})']
  ]
  getShortCuts = function isShortCut (str) {
    return shortcuts.reduce(
      function (memo, short) {
        if(memo) return memo
        return last(str.split(short[0])) === '' ? short : false
      },
      false
    )
  }

  replaceShortCut = function replaceShortCut (shortcut, str) {
    return str.substr(0, str.length - shortcut[0].length) + shortcut[1]
  }

  checkShortCut = function checkShortCut (e) {
    e.preventDefault()
    var elem = e.target
    var strArr = [elem.value.substr(0, elem.selectionStart), elem.value.substr(elem.selectionStart)]
    var shortcut
    if(shortcut = getShortCuts(strArr[0])) {
      strArr[0] = replaceShortCut(shortcut, strArr[0])
      elem.value = strArr.join('')
      e.selectionStart = strArr[0].length
      e.selectionEnd = strArr[0].length
      return true
    }
    return false
  }
})()
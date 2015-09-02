addEventListener('load', function () {

  var elems = ['input', 'textarea']
    .map(function (e) {
      return document.querySelector(e)
    })

  elems[0].addEventListener('keydown', function (e) {
    return matchMulti(e, [
      [
        isKeyChecker('enter', true),
        callerWith(dispatchSubmitEvent, 'target')
      ]
    ])[0]
  })

  elems[1].addEventListener('keydown', function (e) {
    return matchSingle(e, [
      [
        isControlEnter,
        callerWith(dispatchSubmitEvent, 'target')
      ],
      [
        isKeyChecker('tab', true),
        checkShortCut
      ],
      [
        isKeyChecker('tab', true),
        insertTwoSpaces
      ]
    ])
  })

  function callerWith (func, key) {
    return function (obj) {
      return obj[key] ? func(obj[key]) : false
    }
  }

  function dispatchSubmitEvent(element) {
    return !dispatchEvent(newSubmitEvent(element))
  }

  function newSubmitEvent (element) {
    return newEvent(
      'submit-' + element.tagName.toLowerCase(),
      { value: element.value }
    )
  }

  function newEvent (name, detail) {
    return new CustomEvent(name, {detail: detail})
  }

  function isControlEnter (e) {
    return (e.ctrlKey || e.shiftKey) && isKey('enter', e)
  }

  function isKeyChecker (key, only) {
    return function (e) {
      return isKey(key, e, only)
    }
  }

  function isKey (key, e, only) {
    var keys = [
      ['tab', 9],
      ['enter', 13]
    ]
    if(only && (e.shiftKey || e.ctrlKey)) return false
    var keyPressed = keys.find(function (keyArr) {
      return (keyArr[0] === key && keyArr[1] === e.keyCode)
    })
    return !!keyPressed
  }

  function insertTwoSpaces (e) {
    var text
    var start
    e.preventDefault()
    start = e.target.selectionStart
    text = e.target.value
    e.target.value = [
      text.substr(0, start),
      text.substr(start)
    ].join('  ')
    e.target.selectionStart = start + 2
    e.target.selectionEnd = start + 2
  }

})

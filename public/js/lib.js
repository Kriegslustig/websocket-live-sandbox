function matchMulti (val, arr) {
  return arr.map(function (condCb) {
    return match(condCb[0], val) ?
      condCb[1](val) :
      false
  })
}

function matchSingle (val, arr) {
  var returnVal = false
  for(var i = 0; i < arr.length; i++) {
    if(
      match(arr[i][0], val) &&
      (returnVal = arr[i][1](val))
    ) return returnVal
  }
  return returnVal
}

function match (cond, thing) {
  if(is(cond, RegExp)) {
    return cond.test(thing)
  } else if(is(cond, 'function')) {
    return cond(thing)
  } else if(is(cond, 'string') || is(cond, 'boolean')) {
    return cond === thing
  }
  return false
}

function deepAppend (target, elem) {
  target.children.length > 0 ?
    deepAppend(target.children[0], elem) :
    target.appendChild(elem)
  return target
}

function is (thing, type) {
  if(typeof type == 'string') return (typeof thing == type)
  if(typeof type == 'object') return (type.isPrototypeOf(thing))
  return false
}

function last (arr) {
  for(i=arr.length; i--; i>0) {
    if(arr[i] || is(arr[i], 'string')) return arr[i]
  }
}

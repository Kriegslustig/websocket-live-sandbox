function matchMulti (val, arr) {
  return !!arr.map(function (condCb) {
    return match(condCb[0], val) ?
      condCb[1](val) :
      false
  }).length
}

function match (cond, thing) {
  if(is(cond, RegExp)) {
    return cond.test(thing)
  } else if(is(cond, 'function')) {
    return cond(thing)
  } else if(is(cond, 'string')) {
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

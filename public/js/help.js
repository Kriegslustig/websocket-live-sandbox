toggleHelp()
addEventListener('hashchange', toggleHelp)

function toggleHelp () {
  var hash = location.href.split('#')[1]
  var link = document.getElementsByClassName('helpToggle')[0]
  var help = document.getElementsByClassName('help')[0]
  if(hash && hash.indexOf('help') > -1) {
    link.href = '#'
    help.className = 'help help help--open'
  } else {
    link.href = '#help'
    help.className = 'help'
  }
}

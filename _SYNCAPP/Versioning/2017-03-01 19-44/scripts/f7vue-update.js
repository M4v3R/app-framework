// Load configuration
var cfg = require('./config.js')

// Load packages
var path = require('path')
var isThere = require('is-there')
var run = require('child_process').exec
var copy = require('cpx').copySync
var showOnly = require('./show-only.js')

// Framework7-Vue folder exists
var f7vueFolder = path.resolve(cfg.packageRoot, '..', 'Framework7-Vue')
if (isThere(f7vueFolder)) {
  // Build
  showOnly('Framework7-Vue build ongoing ... please wait')
  run('cd "' + f7vueFolder + '" && npm run build', function (err, stdOut, errOut) {
    if (!err) {
      // Dist
      showOnly('Framework7-Vue dist ongoing ... please wait')
      run('cd "' + f7vueFolder + '" && npm run dist', function (err, stdOut, errOut) {
        if (!err) {
          // Copy script
          copy(path.resolve(f7vueFolder, 'dist/framework7-vue.min.js'), cfg.packageRoot + 'vendor/framework7-vue')
        } else {
          showOnly('Error: Framework7-Vue dist failed')
        }
      })
    } else {
      showOnly('Error: Framework7-Vue build failed')
    }
  })
} else {
  showOnly('Error: Framework7-Vue folder not found')
}

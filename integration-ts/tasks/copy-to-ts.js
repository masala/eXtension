import ncp from 'ncp'
import rmfr from 'rmfr'

// Path are relative to package.json
const x = './node_modules/@masala/x'

deleteSources()
  .then(deleteBuild)
  .then(copy)
  .catch(displayError)

function displayError(e) {
  console.error(e)
}

function deleteSources() {
  return rmfr(`${x}/test.txt`)
}

function deleteBuild() {
  return rmfr(`${x}/build`)
}

function ncpError(err) {
  if (err) {
    return console.error(err)
  }
  console.log('done!')
}

function copy() {
  ncp('../build/', `${x}/build`, ncpError)
  console.log('first', `${x}/build`)
  ncp('../src/', `${x}/src`, ncpError)
  ncp('../masala-x.d.ts', `${x}/masala-x.d.ts`, ncpError)
  ncp('../package.json', `${x}/package.json`, ncpError)
  console.log('Done --- \n')
}

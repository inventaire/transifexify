const fs = require('fs')
const pick = require('lodash.pick')
const { grey, green } = require('tiny-chalk')

// takes json files as input with names like fr.json
// and creates a fr.transifex.json file that shouldn't throw errors when parsed by Transifex

const exist = obj => (obj != null ? obj.length : undefined) > 0

const logObjLength = (label, obj) => console.log(grey(label), Object.keys(obj).length.toString())

const getNewFilePath = filePath => filePath.replace('.json', '') + '.transifex.json'

const transifexify = filePath => {
  if (filePath == null) throw new Error('missing file argument')

  const text = fs.readFileSync(filePath, 'utf-8')
  const obj = JSON.parse(text)

  logObjLength('src file keys:', obj)
  // only keep keys passing the existance test
  const transifexCompatibleObj = pick(obj, exist)
  logObjLength('tx file keys:', transifexCompatibleObj)

  const newFilePath = getNewFilePath(filePath)

  fs.writeFileSync(newFilePath, JSON.stringify(transifexCompatibleObj, null, 4))
  return console.log(green('done!'), newFilePath)
}

const transifexifyAll = filesPaths => filesPaths.forEach(transifexify)

module.exports = transifexifyAll

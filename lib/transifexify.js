const fs = require('fs')
const pick = require('./pick')
const { grey, green } = require('tiny-chalk')
const specialValuePattern = /^__\w+$/

// Takes json files as input with names like fr.json
// and creates a fr.transifex.json file that shouldn't throw errors when parsed by Transifex

const shouldBeIncluded = value => value != null && value.length > 0 && !specialValuePattern.test(value)

const logObjLength = (label, obj) => console.log(grey(label), Object.keys(obj).length.toString())

const getNewFilePath = filePath => filePath.replace('.json', '') + '.transifex.json'

const transifexify = filePath => {
  if (filePath == null) throw new Error('missing file argument')

  const text = fs.readFileSync(filePath, 'utf-8')
  const obj = JSON.parse(text)

  logObjLength('src file keys:', obj)
  const transifexCompatibleObj = pick(obj, shouldBeIncluded)
  logObjLength('tx file keys:', transifexCompatibleObj)

  const newFilePath = getNewFilePath(filePath)

  fs.writeFileSync(newFilePath, JSON.stringify(transifexCompatibleObj, null, 4))
  return console.log(green('done!'), newFilePath)
}

const transifexifyAll = filesPaths => filesPaths.forEach(transifexify)

module.exports = transifexifyAll

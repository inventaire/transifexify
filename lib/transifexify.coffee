fs = require 'fs'
pick = require 'lodash.pick'
require 'colors'

# takes json files as input with names like fr.json
# and creates a fr.transifex.json file that shouldn't throw errors when parsed by Transifex

exist = (obj)-> obj?.length > 0

logObjLength = (label, obj)->
  console.log label.grey, Object.keys(obj).length.toString()

getNewFilePath = (filePath)->
  return filePath.replace('.json', '') + '.transifex.json'

transifexify = (filePath)->
  unless filePath?
    throw new Error 'missing file argument'

  text = fs.readFileSync filePath, 'utf-8'
  obj = JSON.parse text

  logObjLength 'src file keys:', obj
  # only keep keys passing the existance test
  transifexCompatibleObj = pick obj, exist
  logObjLength 'tx file keys:', transifexCompatibleObj

  newFilePath = getNewFilePath filePath

  fs.writeFileSync newFilePath, JSON.stringify(transifexCompatibleObj, null, 4)
  console.log 'done!'.green, newFilePath


transifexifyAll = (filesPaths)->
  filesPaths.forEach transifexify

module.exports = transifexifyAll

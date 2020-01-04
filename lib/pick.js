module.exports = (obj, predicate) => {
  const picked = {}
  Object.keys(obj).forEach(prop => {
    const value = obj[prop]
    if (predicate(value)) picked[prop] = value
  })
  return picked
}

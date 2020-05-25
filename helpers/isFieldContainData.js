module.exports = function isFieldContainData(object, field) {
  if(!object.field) throw `You need to specify ${field}`
}
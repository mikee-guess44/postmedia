export function checkIfMod(mods, id) {
  let _mods = { isnot: [], is: [] }
  Object.keys(mods).forEach((item) => {
    let result = mods[item] == id ? true : false
    if (result) {
      _mods.is.push(item)
    }
    if (!result) {
      _mods.isnot.push(item)
    }
  })

  return _mods
}

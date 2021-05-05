export function checkPsfree(mods) {
  let _mods = { empty: [], filled: []}

  Object.keys(mods).forEach((item) => {

    if(mods[item] == '') {
      _mods.empty.push(item)
    }
    if (mods[item] != '') {
      _mods.filled.push(item)
    }
  })

  return _mods
}

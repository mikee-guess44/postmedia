import { updateComp } from './updateComp.js'
import { checkIfMod } from './checkIfMod.js';


export function handleComp(store, mods, psFree, idMod, app, component) {

  let ifMod = checkIfMod(mods, idMod)
  if (ifMod.is.length == 0) {

    store.do('moduleSet', {
       ps: psFree.empty[0],
       id: idMod
     })
    updateComp(app, 'attach', component)

  } else {

    store.do('moduleSet', {
         ps: ifMod.is[0],
         id: ''
       })
    updateComp(app, 'detach', component)

  }
}

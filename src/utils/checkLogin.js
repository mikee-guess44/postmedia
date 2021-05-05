import { updateComp } from './updateComp.js';
import { randomInt } from '../utils/randomInt.js';
import { checkPsfree } from '../utils/checkPsfree.js';
export async function checkLogin(perms, store, App, components ) {
  if (perms.length > 0) {

    updateComp(App, 'attach', components)

    let address = await arweaveWallet.getActiveAddress()

    store.do('setContent', [
      { element: 'user', field: 'address', value: address },
      { element: 'user', field: 'display', value: 'true' },
      { element: 'user', field: 'avatar', value: `https://avatars.dicebear.com/api/avataaars/${randomInt()}.svg?` }
    ])
    store.do('setStyle', [
      { element: 'buttonWallet', style: 'loading', value: 'false' },
      { element: 'buttonWallet', style: 'display', value: 'false' }
    ])

  }
  if (perms.length == 0){

    let _ifMod = checkPsfree(App.store.get('modulesGet'))

    for (var i = 0; i < _ifMod.filled.length; i++) {

      App.store.do('moduleSet', {ps: _ifMod.filled[i], id: ''} )
    }

    updateComp(App, 'detach', components)

    store.do('setStyle', [

      { element: 'buttonWallet', style: 'display', value: 'true' }
    ])

    store.do('setContent', [
      { element: 'user', field: 'address', value: '' },
      { element: 'user', field: 'display', value: 'false' }
    ])

  }
}

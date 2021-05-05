import Reef from 'reefjs';

// Import Components
import { NavBar } from './components/NavBar.js'
import { Uploader } from './components/Uploader.js'
import { ShowComp } from './components/ShowComp.js'
import { Scanner } from './components/Scanner.js'

//Imports Utils Functions
import { uploadFiles } from './utils/uploadFiles.js'
import { updateComp } from './utils/updateComp.js'
import { checkPsfree } from './utils/checkPsfree.js';
import { checkLogin } from './utils/checkLogin.js';
import { randomInt } from './utils/randomInt.js'
import { handleComp } from './utils/handleComp.js';


export const MainApp = function() {

  let store = new Reef.Store({
  	data: {
      user: {},
      modules: {
        m1: '',
        m2: ''
      },
      styles : {},
      files: []
  	},
  	setters: {
      moduleSet: function (props, todo) {

        let mods = props.modules;
        let _md = todo.ps
        let _id = todo.id
        if (_id == '') {
          mods[_md] = ''
        }
        if (_id != '' ) {
          mods[_md] = _id
        }

      },
      pushFiles: function (props, todo) {
        props.files.push(todo);
      }
  	},
  	getters: {
      modulesGet: function (props) {
        return props.modules;
      },
      getFiles: function (props) {
        return props.files
      },
  	}
  });
  let App = new Reef('#app', {
    	store: store,
    	template: function (props) {

        let _mods = props.modules;

        let navbar = `<div id="nav-bar"></div>`
        let modulesHeader = `<div class="columns  mt-1">
                              <div class="column m-2 is-flex is-justify-content-center" id="show-component"></div>
                            </div>`
        let modules = `<div class="columns mt-0">
                              <div class="column box m-2" id="${_mods.m1}"></div>
                              <div class="column box m-2" id="${_mods.m2}"></div>
                            </div>`

        let app = `<div class='px-3 py-4 has-background-white'>
                    ${navbar}
                    ${modulesHeader}
                    ${modules}
                  </div>`
    		return app
    	}
    });

  updateComp(App, 'attach', [NavBar])

  arweaveWallet.getPermissions().then((perms) => {

    checkLogin(perms, NavBar.store, App, [ShowComp])


  })

  document.addEventListener('change', (event) => {
    let inputFiles = document.getElementById('uploader')

    if (event.target.id == 'uploader' && inputFiles.files.length > 0) {
      Uploader.store.do('setStyle', {
        element: 'buttonStampFiles',
        style: 'disable',
        value: 'false'
      })
    }
  })
  document.addEventListener('click', (event) => {

  let inputFiles = document.getElementById('uploader')

  //Post Files Click Event
  if (event.target.id == 'btn-stamp-files' || event.target.parentNode.id == 'btn-stamp-files') {

    if (inputFiles != null && inputFiles.files.length > 0) {

      Uploader.store.do('setStyle', {
        element: 'buttonStampFiles',
        style: 'loading',
        value: 'true'
      })
      Uploader.store.do('setContent', [{
        element: 'loadText',
        field: 'value',
        value: 'true'
      }])
      uploadFiles(inputFiles).then((files) => {

        if (files.error) {

          Uploader.store.do('setStyle', {
            element: 'buttonStampFiles',
            style: 'loading',
            value: 'false'
          })
          Uploader.store.do('setContent', [
            { element: 'loadText', field: 'value', value: 'false' },
            { element: 'loadError', field: 'value', value: 'true' }
          ])
          setTimeout(() => {
            Uploader.store.do('setContent', [{ element: 'loadError', field: 'value', value: 'false'}])
          }, 4500);
        }
        if (!files.error) {

          for (var file of files) {
            let items = store.get('getFiles')
            file.id = items.length + 1
            store.do('pushFiles', file)
          }

          let tableF = store.get('getFiles')
          sessionStorage.setItem('files', JSON.stringify(tableF));
          Uploader.store.do('setContent', [
            { element: 'tableFiles', field: 'value', value: tableF },
            { element: 'loadText', field: 'value', value: 'false' }
          ])
          Uploader.store.do('setStyle', {
            element: 'buttonStampFiles',
            style: 'loading',
            value: 'false'
          })

        }

      })

    }
  }
  if (event.target.id == 'connect-wallet' || event.target.parentNode.id == 'connect-wallet') {

    NavBar.store.do('setStyle', [
      { element: 'buttonWallet', style: 'loading', value: 'true' }
    ])

    arweaveWallet.connect(['ACCESS_ADDRESS'], {name: 'PostMedia'}).then((value) => {

      NavBar.store.do('setStyle', [
        { element: 'buttonWallet', style: 'loading', value: 'false' },
        { element: 'buttonWallet', style: 'display', value: 'false' }
      ])
      arweaveWallet.getPermissions().then((perms) => {

        checkLogin(perms, NavBar.store, App, [ShowComp])


      })
    })


  }
  if (event.target.id == 'change-component' || event.target.parentNode.id == 'change-component') {

    let mods = store.get('modulesGet')
    let psFree = checkPsfree(mods)

    if (event.target.value === 'uploader' || event.target.parentNode.value == 'uploader') {

      handleComp(store, mods, psFree, 'upload-files', App, [Uploader])

    }
    if (event.target.value === 'scanner' || event.target.parentNode.value == 'scanner') {

      handleComp(store, mods, psFree, 'scanner', App, [Scanner])
    }

  }
  if (event.target.id == 'avatar-user') {
    NavBar.store.do('setContent', [{
      element: 'user',
      field: 'avatar',
      value: `https://avatars.dicebear.com/api/avataaars/${randomInt()}.svg`
    }])
  }


})
}

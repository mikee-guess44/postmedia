import Reef from 'reefjs';

import ArDB from 'ardb';

// Import Components
import { NavBar } from './components/NavBar.js'
import { Uploader } from './components/Uploader.js'
import { ShowComp } from './components/ShowComp.js'
import { Scanner } from './components/Scanner.js'
import { installArconnect } from "./installArconnect.js";
//Imports Utils Functions
import { uploadFiles } from './utils/uploadFiles.js'
import { updateComp } from './utils/updateComp.js'
import { checkPsfree } from './utils/checkPsfree.js';
import { checkLogin } from './utils/checkLogin.js';
import { getTxUser } from './utils/getTxUser.js';
import { randomInt } from './utils/randomInt.js'
import { handleComp } from './utils/handleComp.js';
import { handlePostData } from './utils/handlePostData.js'

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

  const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false
});
  let ardb = new ArDB(arweave);
  installArconnect.store.do('setTitle', '')
  arweaveWallet.getPermissions().then((perms) => {

    checkLogin(perms, NavBar.store, App, [ShowComp])
  })
  //-----------------------------------------------

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
  //----------------------------------------------
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
      uploadFiles(inputFiles, arweave).then((response) => {

        if (!response.result) {

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
        if (response.result) {

          handlePostData(arweave, Uploader.store).then((files) => {
            Scanner.store.do('setContent', [
              { element: 'loadItem', field: 'value', value: true }

            ])
            arweaveWallet.getActiveAddress().then((address) => {
              Uploader.store.do('setStyle', {
                element: 'buttonStampFiles',
                style: 'loading',
                value: 'false'
              })

              for (var file of files) {
                let items = store.get('getFiles')
                file.id = items.length + 1
                store.do('pushFiles', file)
              }

              let tableF = store.get('getFiles')
              localforage.setItem('filesData', tableF)

              Uploader.store.do('setContent', [
                { element: 'tableFiles', field: 'value', value: tableF },
                { element: 'loadText', field: 'value', value: 'false' }
              ])
              getTxUser(ardb, address).then((value) => {
                if (value.count > 0) {
                  Scanner.store.do('setContent', [
                    { element: 'scannerData', field: 'value', value: value.data },
                    { element: 'loadItem', field: 'value', value: false },
                    { element: 'userDetails', field: 'count', value: value.count }

                  ])
                }
                if (value.count == 0) {
                  Scanner.store.do('setContent', [
                    { element: 'loadItem', field: 'value', value: false },
                    { element: 'loadError', field: 'value', value: true },

                  ])

                  setTimeout(() => {
                    Scanner.store.do('setContent', [{ element: 'loadError', field: 'value', value: false }])
                  }, 10000);
                }

              }).catch((err) => {

                Scanner.store.do('setContent', [

                  { element: 'loadItem', field: 'value', value: false },
                  { element: 'serverError', field: 'value', value: true }
                ])
                setTimeout(() => {
                  Scanner.store.do('setContent', [{ element: 'serverError', field: 'value', value: false }])
                }, 4500);
              })

            })

          })
        }

      })

    }
  }
  if (event.target.id == 'connect-wallet' || event.target.parentNode.id == 'connect-wallet') {

    NavBar.store.do('setStyle', [
      { element: 'buttonWallet', style: 'loading', value: 'true' }
    ])

    arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION'], {name: 'PostMedia'}).then((value) => {

      NavBar.store.do('setStyle', [
        { element: 'buttonWallet', style: 'loading', value: 'false' },
        { element: 'buttonWallet', style: 'display', value: 'false' }
      ])
      arweaveWallet.getPermissions().then((perms) => {

        checkLogin(perms, NavBar.store, App, [ShowComp])


      })
    }).catch((err) => {
      NavBar.store.do('setStyle', [
        { element: 'buttonWallet', style: 'loading', value: 'false' }
      ])
    })


  }
  if (event.target.id == 'change-component' || event.target.parentNode.id == 'change-component') {

    let mods = store.get('modulesGet')
    let psFree = checkPsfree(mods)

    if (event.target.value === 'uploader' || event.target.parentNode.value == 'uploader') {
      localforage.getItem('filesData').then((value) => {
        if (value != null) {
          let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value));
          Uploader.store.do('setContent', [
            { element: 'tableFiles', field: 'value', value: value },
            { element: 'jsonData', field: 'value', value: data }
          ])
        }
      })
      handleComp(store, mods, psFree, 'upload-files', App, [Uploader])

    }
    if (event.target.value === 'scanner' || event.target.parentNode.value == 'scanner') {
      arweaveWallet.getActiveAddress().then((address) => {
        handleComp(store, mods, psFree, 'scanner', App, [Scanner])
        getTxUser(ardb, address).then((value) => {
          if (value.count > 0) {
            Scanner.store.do('setContent', [
              { element: 'scannerData', field: 'value', value: value.data },
              { element: 'loadItem', field: 'value', value: false },
              { element: 'userDetails', field: 'count', value: value.count }

            ])
          }
          if (value.count == 0) {
            Scanner.store.do('setContent', [
              { element: 'loadItem', field: 'value', value: false },
              { element: 'loadError', field: 'value', value: true },

            ])

            setTimeout(() => {
              Scanner.store.do('setContent', [{ element: 'loadError', field: 'value', value: false }])
            }, 10000);
          }

        }).catch((err) => {

          Scanner.store.do('setContent', [

            { element: 'loadItem', field: 'value', value: false },
            { element: 'serverError', field: 'value', value: true }
          ])
          setTimeout(() => {
            Scanner.store.do('setContent', [{ element: 'serverError', field: 'value', value: false }])
          }, 4500);
        })

      })
    }

  }
  if (event.target.id == 'empty-list') {
    localforage.clear().then(() => {
      Uploader.store.do('setContent', [
          { element: 'tableFiles', field: 'value', value: '' }
      ])
    })
  }
  if (event.target.id == 'avatar-user') {
    NavBar.store.do('setContent', [{
      element: 'user',
      field: 'avatar',
      value: `https://avatars.dicebear.com/api/avataaars/${randomInt()}.svg`
    }])
  }
  if (event.target.id == 'export-json' || event.target.parentNode.id == 'export-json') {
    localforage.getItem('filesData').then((value) => {
      if (value != null) {
        let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value, null, 2));

        Uploader.store.do('setContent', [
          { element: 'jsonData', field: 'value', value: data }
        ])
      }
    })
  }


})


}

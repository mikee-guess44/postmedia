import Reef from 'reefjs';

// Import Components
import { NavBar } from './components/NavBar.js'

// Import Utils

import { updateComp } from './utils/updateComp.js'

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

  		return `<div class='px-6 py-4 has-background-white'>
                <div id="nav-bar">
                </div>
                <div class="columns mt-4">
                  <div class="column box m-2" id="show-component"></div>
                </div>
                <div class="columns mt-4">
  								<div class="column box m-2" id="${_mods.m1}"></div>
  								<div class="column box m-2" id="${_mods.m2}"></div>
  							</div>
              </div>`;
  	}
  });

  updateComp(App, 'attach', [NavBar])

}

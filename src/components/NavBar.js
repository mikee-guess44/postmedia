import Reef from 'reefjs';

let storeNavbar = new Reef.Store({
  data: {
    styles: {
      buttonWallet: {
        display: 'true',
        loading: 'false'
      }
    },
    content: {
      user: {
        display: '',
        address: '',
        avatar: ''
      }
    },
    files: { value: [] }
  },
  setters: {
    setStyle: function (props, todos) {

      for (var i = 0; i < todos.length; i++) {

       let _elmt = props.styles[todos[i].element];
       todos[i].value != '' ? _elmt[todos[i].style] = todos[i].value : _elmt[todos[i].style] = ''
      }

    },
    setContent: function (props, todos) {

      for (var i = 0; i < todos.length; i++) {

       let td = props.content[todos[i].element];
       todos[i].value != '' ? td[todos[i].field] = todos[i].value : td[todos[i].field] = ''
      }

    }
  },
  getters: {}
})
export const NavBar = new Reef('#nav-bar', {
  store: storeNavbar,
  template: function (props) {

    let navbar = `<nav class="navbar mt-3 py-3  px-4 has-background-light is-flex is-align-items-center" role="navigation" aria-label="main navigation">

    </nav>`

    return navbar
  }
})

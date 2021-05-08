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
  template: function (props, elem) {

    let _stys = props.styles;
    let _cnt = props.content;

    let btnWalletDisplay = _stys.buttonWallet.display == 'true' ? '' : 'is-hidden';
    let btnWalletLoading = _stys.buttonWallet.loading == 'false' ? '' : 'is-loading';

    let userAddress = _cnt.user.address;
    let userDisplay = _cnt.user.display == 'true' ? '' : 'is-hidden';
    let userAvatar = _cnt.user.avatar;

    let navbarStart = `<div class="navbar-brand ml-6">
      <a class="navbar-item" href="#">
        <img src="https://arweave.net/I2774jQ1jk_fFz22js1lW1CPsiThq9y0FDfWAjd_yag">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarTarget">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>`
    let userDetails = `<div class="navbar-item ${userDisplay}">
      <figure class="image is-32x32">
        <img src="${userAvatar}" id="avatar-user">
      </figure>
      <span class="navbar-item is-size-7">
        ${userAddress}
      </span>
    </div>`
    let btnConnect = `<div class="navbar-item">
<button class="button is-info is-small mr-4 ${btnWalletDisplay} ${btnWalletLoading} is-flex is-aling-items-center" id="connect-wallet">
<img class="image is-24x24" src="https://raw.githubusercontent.com/th8ta/ArConnect/development/src/assets/logo.png">
<span class=" ml-2">
CONNECT WALLET
</span>
</button>
</div>`
    let navbarEnd = `<div class="navbar-menu" id="navbarTarget" >
    <div class="navbar-end">
    ${userDetails}
    ${btnConnect}
    </div>
    </div>`
    let navbar = `<nav class="navbar mt-3 py-3  px-4 has-background-light is-flex is-align-items-center" role="navigation" aria-label="main navigation">
      ${navbarStart}
      ${navbarEnd}
    </nav>`

    return navbar

  }
})

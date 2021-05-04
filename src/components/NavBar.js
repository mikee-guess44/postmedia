import Reef from 'reefjs';

let storeNavbar = new Reef.Store({
  data: {}
})
export const NavBar = new Reef('#nav-bar', {
  store: storeNavbar,
  template: function (props) {

    let navbar = `<nav class="navbar mt-3 py-3  px-4 has-background-light is-flex is-align-items-center" role="navigation" aria-label="main navigation">

    </nav>`

    return navbar
  }
})

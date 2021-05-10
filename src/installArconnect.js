import Reef from 'reefjs';

let store = new Reef.Store({
  data: {
    title: 'Please Install ArConnect Extension'
  },
  setters: {
    setTitle: function (props, todo) {

      if (todo == '') {
        props.title = ''
      }
    }
  }
});
export const installArconnect = new Reef('#arconnect', {
  store: store,
  template: function (props) {
  return `<div class="container"><h1>${props.title}</h1></div>`
}
})

installArconnect.render()

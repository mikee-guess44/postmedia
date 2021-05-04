export function updateComp(App, action, components) {
  if (action === 'attach') {

    for (var i = 0; i < components.length; i++) {
      App.attach(components[i])

    }

    App.render()
    return true
  }
  if (action === 'detach') {
    for (var i = 0; i < components.length; i++) {
      App.detach(components[i])

    }
    App.render()
    return true
  }
}

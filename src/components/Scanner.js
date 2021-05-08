import Reef from 'reefjs';


let storeScanner = new Reef.Store({
  data: {
    styles: {},
    content: {
      scannerData: { value: []},
      loadItem: { value: true },
      loadError: { value: false},
      serverError: { value: false},
      userDetails: { count: '', value: ''}
    }
  },
  setters: {
    setStyle: function (props, todo) {
      let _elmt = props.styles[todo.element]
      _elmt[todo.style] = todo.value
    },
    setContent: function (props, todos) {



      for (var i = 0; i < todos.length; i++) {

       let td = props.content[todos[i].element];
       todos[i].value != '' ? td[todos[i].field] = todos[i].value : td[todos[i].field] = ''
      }


    }
  },
  getters: {
    getStyles: function (props) {
      return props.styles
    }
  }
})
export const Scanner = new Reef('#scanner', {
  store: storeScanner,
  template: function (props, elem) {

    let _cnt = props.content;
    let emptyGallery = `<div class="level-item has-text-centered mt-4">
                          <span class="notification is-light p-1 px-6 is-size-7">
                          <i class="fas fa-exclamation-triangle has-text-warning"></i>
                          ¡You haven't uploaded any files yet! Please use the Uploader to upload some files..
                          </span>
                        </div>`
    let serverError = `<div class="level-item has-text-centered mt-4">
                          <span class="notification is-light p-1 px-6 is-size-7">
                          <i class="fas fa-exclamation-triangle has-text-warning"></i>
                          ¡Connection error! Please try again..
                          </span>
                        </div>`
    let title = `<h1 class="title box is-size-6">Your gallery media files | Items total: ${_cnt.userDetails.count ? _cnt.userDetails.count : ''}</h1>`
    let loader = `<progress class="progress is-small is-primary" max="100">15%</progress>`
    let images = `<h6 class="title is-6 ml-4 mt-4 mb-1">Images</h6>
<div class="box is-flex is-flex-direction-row	 is-flex-wrap-wrap is-align-items-baseline is-justify-content-center is-align-content-space-around">
${_cnt.scannerData.value ? eatImages(_cnt.scannerData.value) : ''}
</div>`
    let videos = `<h6 class="title is-6 ml-4 mt-4 mb-1">Videos</h6>
<div class="box is-flex is-flex-wrap-wrap is-align-items-baseline is-justify-content-center is-align-content-space-around">
${_cnt.scannerData.value ? eatVideos(_cnt.scannerData.value) : ''}
</div>`
    let audios = `<h6 class="title is-6 ml-4 mt-4 mb-1">Audios</h6>
<div class="box is-flex is-flex-wrap-wrap is-align-items-baseline is-justify-content-center is-align-content-space-around">
${_cnt.scannerData.value ? eatAudios(_cnt.scannerData.value) : ''}
</div>`
    let scanner = `<div class="">
    ${title}
${_cnt.loadItem.value ? loader : ''}
${_cnt.loadError.value ?  `${emptyGallery}` : ''}
${_cnt.serverError.value ?  `${serverError}` : ''}
${images}
${videos}
${audios}
</div>`
    return scanner

  }
  })
function eatImages(items) {

  let gallery = Object.keys(items).map((item) => {
    if (items[item].type.startsWith('image')) {
      return `<a href="${items[item].link}" target="_blank"><img class="image is-128x128 m-1" src="${items[item].link}"></a>`
    }

  }).join('\r')

return gallery
}
function eatVideos(items) {

  let gallery = Object.keys(items).map((item) => {
    if (items[item].type.startsWith('video')) {
      return `<a href="${items[item].link}" target="_blank"><video width="244" class="m-1" controls><source src="${items[item].link}" type="${items[item].type}"></video></a>`
    }
  }).join('\r')

return gallery
}
function eatAudios(items) {

  let gallery = Object.keys(items).map((item) => {
        if (items[item].type.startsWith('audio')) {
      return `<a href="${items[item].link}" target="_blank"><audio class="m-1" controls><source src="${items[item].link}" type="${items[item].type}"></audio></a>`
    }
  }).join('\r')

return gallery
}

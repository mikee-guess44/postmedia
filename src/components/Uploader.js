import Reef from 'reefjs';

let storeUploader = new Reef.Store({
  data: {
    styles: {
      buttonStampFiles: {
        loading: 'false',
        display: 'true',
        disabled: 'true'
      }
    },
    content: {
      tableFiles: {},
      loadText: { value: 'false'},
      loadDetails: { value: ''},
      loadError: { value: 'false'},
      jsonData: { value: ''}
    }
  },
  setters: {
    setStyle: function (props, todo) {
      let _elmt = props.styles[todo.element]
      _elmt[todo.style] = todo.value
    },
    setContent: function (props, todos) {



      for (let i = 0; i < todos.length; i++) {

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

export const Uploader = new Reef('#upload-files', {
  store: storeUploader,
  template: function (props) {

    let _stys = props.styles;
    let _cnt = props.content;

    let btnStampLoading = _stys.buttonStampFiles.loading == 'false' ? '' : 'is-loading';
    let btnStampDisable = _stys.buttonStampFiles.disable == 'false' ? '' : 'disabled';

    let serverError = `<div class="level-item has-text-centered mt-4">
                          <span class="notification is-light p-1 px-6 is-size-7">
                          <i class="fas fa-exclamation-triangle has-text-warning"></i>
                          ┬íConnection error! Retry again..
                          </span>
                        </div>`
    let uploaderProgress = `<div class="level mt-2">
    <span class="tag is-light mr-1">${_cnt.loadDetails.value}</span>
    <progress class="progress is-small is-dark" max="100">25%</progress>
    </div>`
    let selectFilesButton = `<div class="file is-small is-outlined mt-2">
      <label class="file-label">
        <input class="file-input" type="file" id="uploader" accept="image/*, audio/*, video/*" multiple>
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Select files..
          </span>
        </span>
      </label>
    </div>`
    let stampButton = `<div><button class="button is-primary is-small is-fullwidth mt-2 ${btnStampLoading}" id="btn-stamp-files" ${btnStampDisable}>
                          <span class="icon">
                            <i class="fas fa-stamp"></i>
                          </span>
                          <span class="">
                            POSTMEDIA
                          </span>
                        </div>`
    let uploaderTittle = `<h1 class="title is-size-6 level-item has-text-centered">Uploader</h1>`

    return `<div>
              ${uploaderTittle}
              ${selectFilesButton}

              ${stampButton}

              ${_cnt.loadText.value == 'true' ?  `${uploaderProgress}` : ''}
              ${_cnt.loadError.value == 'true' ?  `${serverError}` : ''}
              ${_cnt.tableFiles.value ? eatFiles(_cnt.tableFiles.value, _cnt.jsonData.value) : ''}
            </div>`

  }
})

function eatFiles(files, data) {

  let result = ''
  result = `<div class="is-flex is-justify-content-flex-end p-0  mt-6">
    <a class="tag is-success is-small" href="data:${data}" download="data.json" id="export-json">
        <i class="fas fa-file-signature mr-1 has-text-dark"></i>
        Export Json File
    </a>
  </div>
  <table class="table has-text-black-bis is-hoverable is-fullwidth is-size-7 mt-2">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Size</th>
        <th>Type</th>
        <th>Prewiew</th>
      </tr>
    </thead>
    <tbody>
    ${Object.keys(files).map((file) => {
      let image = `<td><a href="${files[file].link}" target="_blank"><img src="${files[file].link}" class="image is-24x24"></a></td>`
      let video = `<td><a href="${files[file].link}" target="_blank"><span class="icon has-text-dark"><i class="fas fa-fw fa-lg fa-file-video"></i></span></a></td>`
      let audio = `<td><a href="${files[file].link}" target="_blank"><span class="icon has-text-dark"><i class="fas fa-fw fa-lg fa-file-audio"></i></span></a></td>`
      return `
      <tr>
        <td>${files[file].id}</td>
        <td>${files[file].name}</td>
        <td>${(files[file].size / 1000).toFixed(1)} kB</td>
        <td>${files[file].type}</td>
        ${files[file].type.startsWith('image') ? image : ''}
        ${files[file].type.startsWith('video') ? video : ''}
        ${files[file].type.startsWith('audio') ? audio : ''}
      </tr>`
    }).join('\r')}
    </tbody>
  </table>
  <button class="button is-small is-danger" id="empty-list">Empty List</button>`
    return result

}

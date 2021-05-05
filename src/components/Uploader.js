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
      loadError: { value: 'false'}
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

export const Uploader = new Reef('#upload-files', {
  store: storeUploader,
  template: function (props) {

    let _stys = props.styles;
    let _cnt = props.content;

    var btnStampLoading = _stys.buttonStampFiles.loading == 'false' ? '' : 'is-loading';
    var btnStampDisable = _stys.buttonStampFiles.disable == 'false' ? '' : 'disabled';

    var serverError = `<div class="level-item has-text-centered mt-4">
                          <span class="notification is-light p-1 px-6 is-size-7">
                          <i class="fas fa-exclamation-triangle has-text-warning"></i>
                          ¡Connection error! Retry again..
                          </span>
                        </div>`
    var uploaderProgress = `<progress class="progress is-small is-dark mt-2" max="100">25%</progress>`
    var selectFilesButton = `<div class="file is-small is-outlined mt-2">
      <label class="file-label">
        <input class="file-input" type="file" id="uploader" multiple>
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
    var stampButton = `<div><button class="button is-primary is-outlined is-small is-fullwidth mt-2 ${btnStampLoading}" id="btn-stamp-files" ${btnStampDisable}>
                          <span class="icon">
                            <i class="fas fa-stamp"></i>
                          </span>
                          <span class="">
                            Stamp
                          </span>
                        </div>`
    var uploaderTittle = `<h1 class="title is-size-6 level-item has-text-centered">Uploader</h1>`
    return `<div>
              ${uploaderTittle}
              ${selectFilesButton}

              ${stampButton}

              ${_cnt.loadText.value == 'true' ?  `${uploaderProgress}` : ''}
              ${_cnt.loadError.value == 'true' ?  `${serverError}` : ''}
              ${_cnt.tableFiles.value ? eatFiles(_cnt.tableFiles.value) : ''}
            </div>`

  }
})

function eatFiles(files) {

  let result = ''
  result = `<table class="table has-text-black-bis is-hoverable is-fullwidth is-size-7 mt-4">
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

      return `
      <tr>
        <td>${files[file].id}</td>
        <td>${files[file].name}</td>
        <td>${(files[file].size / 1000).toFixed(1)} kB</td>
        <td>${files[file].type}</td>
        <td><img src="${files[file].link}" class="image is-32x32"></td>
      </tr>`
    }).join('\r')}
    </tbody>
  </table>
  <button class="button is-small" id="empty-list">Empty List</button>`
    return result

}
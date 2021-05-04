import Reef from 'reefjs';

let storeUploader = new Reef.Store({
  data: {
    styles: {
      buttonStampFiles: {
        loading: 'false',
        display: 'true',
        disabled: 'false'
      }
    },
    content: {
      tableFiles: {}
    }
  },
  setters: {
    setStyle: function (props, todo) {
      let _elmt = props.styles[todo.element]
      _elmt[todo.style] = todo.value
    },
    setContent: function (props, todo) {
      props.content[todo.element] = todo.value;

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

    var btnLoadingDisplay = _stys.buttonStampFiles.loading == 'false' ? '' : 'is-loading';


    return `<div>
              <h1 class="title is-size-6 fullwidth">Uploader</h1>

              <div class="file is-small is-outlined mt-2">
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
              </div>

              <div>
              <button class="button is-primary is-outlined is-small is-fullwidth mt-2 ${btnLoadingDisplay}" id="btn-stamp-files">
              <span class="icon">
              <i class="fas fa-stamp"></i>
              </span>
              <span class="">
              Stamp
              </span>
              </div>

              <table class="table has-text-black-bis is-hoverable is-fullwidth is-size-7 mt-4">
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
                ${eatFiles(_cnt.tableFiles)}
                </tbody>
        			</table>
              <button class="button is-small" id="empty-list">Empty List</button>


            </div>`
  }
})

function eatFiles(files) {
		let content = []

		let result = Object.keys(files).map((file) => {

			return `
			<tr>
				<td>${files[file].id}</td>
				<td>${files[file].name}</td>
				<td>${(files[file].size / 1000).toFixed(1)} kB</td>
				<td>${files[file].type}</td>
				<td><img src="${files[file].link}" class="image is-32x32"></td>
			</tr>`
		}).join('\r')

		return result

}

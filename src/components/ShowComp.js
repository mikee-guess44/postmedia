import Reef from 'reefjs';

export const ShowComp = new Reef('#show-component', {
  template: function () {

    return `<div class="buttons">
              <button class="button" id="change-component" value="uploader">Uploader</button>

              <button class="button" id="change-component" value="scanner">Scanner</button>
              
            </div>`
  }
})

import Reef from 'reefjs';

export const ShowComp = new Reef('#show-component', {
  template: function () {

    let uploaderButton = `<button class="button is-light" id="change-component" value="uploader">
      <i class="icon-item fas fa-upload mr-2"></i>
      <span class="icon-text">
        Uploader
      </span>
    </button>`

    let searchButton = `<button class="button is-light" id="change-component" value="scanner">
    <i class="icon-item fas fa-search mr-2"></i>
      <span class="icon-text is-small">
        Scanner
      </span>
    </button>`
    let makeOfferButton = `<button class="button is-light" id="change-component" value="make-offer">
      <i class="icon-item fas fa-file-invoice-dollar mr-2"></i>
      <span class="icon-text">
        Make Offer
      </span>
    </button>`
    let soundNftButton = `<button class="button is-light" id="change-component" value="sound-nft">
      <i class="icon-item fas fa-file-audio mr-2"></i>
      <span class="icon-text">
        Sound NFT
      </span>
    </button>`
    let tradeButton = `<button class="button is-light" id="change-component" value="trade-asset">
      <i class="icon-item fas fa-hand-holding-usd mr-2"></i>
      <span class="icon-text">
        Trade Asset
      </span>
    </button>`
    let panel = `<div class="buttons">
              ${uploaderButton}
              ${searchButton}
            </div>`
    return panel
  }
})

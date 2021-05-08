import { checkLastId } from './checkLastId.js';
import { postTx } from './postTx.js';


export async  function handlePostData(arweave, store) {
  let lastTxId = ""
  let files = await localforage.getItem('files')
  let linksFiles = []
  let currrent = 0
  let total = files.length

  for (let file of files) {
    currrent++
    store.do('setContent', [{
      element: 'loadDetails',
      field: 'value',
      value: currrent + '/' + total
    }])
    lastTxId = await postTx(arweave, file.data, { tag: 'Content-Type', value: file.type})
    let status = await checkLastId(lastTxId)
    if (status == 200) {
      linksFiles.push({ name: file.name, type: file.type, size: file.size, link: `https://arweave.net/${lastTxId}` })
    }
  }
  return linksFiles
}

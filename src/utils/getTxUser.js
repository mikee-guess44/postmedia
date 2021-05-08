export async function getTxUser(ardb, address) {

  try {
    let data = [];
    let types = ['image/gif', 'image/tiff', 'image/vnd.microsoft.icon', 'image/x-icon', 'image/svg+xml', 'image/jpeg', 'image/png', 'video/mp4','video/mpeg','video/quicktime', 'video/webm', 'video/x-ms-wmv', 'video/x-msvideo', 'video/x-flv', 'audio/mpeg', 'audio/x-ms-wma', 'audio/vnd.rn-realaudio', 'audio/x-wav', 'audio/mp3']
    let txs = await ardb.search('transactions').from(address).tag('Content-Type', types).findAll()
    for (var tx of txs) {
      data.push({ id: tx.node.id, type: tx.node.data.type, size: tx.node.data.size, link: `https://arweave.net/${tx.node.id}` })
    }



    return { result: true, data: data, count: txs.length}
  } catch (e) {
    return { result: false, error: e}
  }
}

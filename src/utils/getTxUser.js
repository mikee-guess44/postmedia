export async function getTxUser(ardb, address) {

  try {
    let data = [];
    let txs = await ardb.search('transactions').from(address).tag('Content-Type', ['image/png', 'video/mp4', 'audio/mpeg', 'audio/mp3']).findAll()

    for (var tx of txs) {
      data.push({ id: tx.node.id, type: tx.node.data.type, size: tx.node.data.size, link: `https://arweave.net/${tx.node.id}` })
    }



    return { result: true, data: data, count: txs.length}
  } catch (e) {
    return { result: false, error: e}
  }
}

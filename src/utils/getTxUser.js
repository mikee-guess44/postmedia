export async function getTxUser(ardb, address) {


  let txs = await ardb.search('transactions').from(address).tag('Content-Type', 'video/mp4').findAll()
  return txs
}

export async function postTx(arweave, file, tags) {

  let response = await arweave.createTransaction({ data: file },);
  for (var tag of tags) {
      response.addTag(tag.tag, tag.value)
  }
  await arweave.transactions.sign(response)
  for await (const uploader of arweave.transactions.upload(response)) {
      console.log(`${uploader.pctComplete}% Complete`);
    }
  return response.id
}

export async function postTx(arweave, file, tag) {

  let response = await arweave.createTransaction({ data: file },);
  response.addTag(tag.tag, tag.value)
  responde.addTag('appName', 'PostMedia')

  await arweave.transactions.sign(response)
  for await (const uploader of arweave.transactions.upload(response)) {
      console.log(`${uploader.pctComplete}% Complete`);
    }
  return response.id
}

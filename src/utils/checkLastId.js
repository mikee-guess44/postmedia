export async function checkLastId(lastId) {
  try {
    var url = `https://arweave.net/${lastId}`
    var result = await fetch(url)

    while (result.status != 200) {
      sleepTime(3000)
      console.log('Get status..');
      result = await fetch(url)
      console.log(result.status);
    }
    if (result.status == 200) {
      return result.status
    }

  } catch (e) {
    console.log(e);
  }
}

function sleepTime(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

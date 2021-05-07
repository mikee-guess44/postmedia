import axios from 'axios';


export async function uploadFiles(array, tags, key, arweave) {
	try {
		let files = array.files
		let buffer = []
		let fileStore;
		for (var i = 0; i < files.length; i++) {
			let itemData = await files[i].arrayBuffer()
			buffer.push({name: files[i].name , type: files[i].type, size: files[i].size, data: itemData})

		}
		fileStore = await localforage.setItem('files', buffer)

		return { result: true }


	} catch (e) {
		return { result: false}
	}



}
// files.forEach((item, i) => {
// let data = Buffer.from(item.buffer);
// let unit8 = new Uint8Array(data);
// filesArray.push({ name: item.originalname, type: item.mimetype, data: unit8, size: item.size })
// });

// var files = [
// 	{name: "pxArt (5).png", type: "image/png", size: 6393, link: "https://arweave.net/goxcjy2cWfT-Rl8ziCzqi3_bXmvRBXWCo-NqZCv-gnA"},
// 	{name: "pxArt (6).png", type: "image/png", size: 4441, link: "https://arweave.net/goxcjy2cWfT-Rl8ziCzqi3_bXmvRBXWCo-NqZCv-gnA"},
// 	{name: "pxArt (7).png", type: "image/png", size: 2124, link: "https://arweave.net/goxcjy2cWfT-Rl8ziCzqi3_bXmvRBXWCo-NqZCv-gnA"}
// ]

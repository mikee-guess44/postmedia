import axios from 'axios';


export async function uploadFiles(array, arweave) {
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

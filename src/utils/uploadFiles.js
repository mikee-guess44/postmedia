import axios from 'axios';


export async function uploadFiles(array) {
	try {
		// var fd = new FormData();
		//
		// for (var file of array.files) {
		// 	fd.append("files", file)
		// }
		//
		// var response = await axios.post('http://localhost:5000/upload',
		// 	fd, {
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data'
		// 	}
		// })
		// response = response.data
		var files = [
			{name: "pxArt (5).png", type: "image/png", size: 6393, link: "https://arweave.net/goxcjy2cWfT-Rl8ziCzqi3_bXmvRBXWCo-NqZCv-gnA"},
			{name: "pxArt (6).png", type: "image/png", size: 4441, link: "https://arweave.net/goxcjy2cWfT-Rl8ziCzqi3_bXmvRBXWCo-NqZCv-gnA"},
			{name: "pxArt (7).png", type: "image/png", size: 2124, link: "https://arweave.net/goxcjy2cWfT-Rl8ziCzqi3_bXmvRBXWCo-NqZCv-gnA"}
		]


		return files

	} catch (e) {

	}



}

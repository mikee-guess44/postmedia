
import { MainApp } from "./MainApp.js";


document.addEventListener('DOMContentLoaded', (event) => {

	window.addEventListener("arweaveWalletLoaded", () => {
	  MainApp()
		
	});



})


import { MainApp } from "./MainApp.js";


document.addEventListener('DOMContentLoaded', (event) => {
	console.log(window);
	window.addEventListener("arweaveWalletLoaded", () => {
	  MainApp()

	});



})

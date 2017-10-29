/*jshint esversion:6, browser: true, devel: true*/

import _Main from "./Main.js";
import {addArticles, deleteArticles} from "./Articles.js";
const Main = new _Main();
window.Main = Main;

if (document.querySelectorAll("article:first-of-type button img").length > 1) {
	deleteArticles();
} else {
	addArticles();
}

function deleteFilter() {
	if (this.nodeName === "LI") {
		this.remove();
	} else {
		this.parentElement.remove();
	}
}

function removeStyle() {
	this.removeAttribute("style");
}

Main.articles.forEach((article) => {
	article.dataset.title = article.querySelector("h3").textContent.replace(" ", "%20").toLowerCase();
	article.paragraph = article.querySelector("p");
	article.words = article.paragraph.textContent.split(" ").length;
	article.readingTime = article.words / 250; //gemiddeld 250 woorden per minuut
	article.timesRead = Math.floor(Math.random() * 1000);
	article.dataset.timesRead = article.timesRead;
	article.dataset.readingTime = article.readingTime;
	article.querySelector("footer li:last-of-type").innerHTML += `${Math.round(article.readingTime)} minu${Math.round(article.readingTime) <= 1 ? "ut" : "ten"}`;
});

//sorteren met knoppies
const sortOrderButton = document.querySelector("main>form button"),
			sortButtons = document.querySelectorAll("main>form fieldset:first-of-type input"),
			filterButtons = document.querySelectorAll("main>form fieldset:last-of-type input");

sortOrderButton.addEventListener("click", () => {
	event.preventDefault();
	sortOrderButton.bottomFirst = sortOrderButton.bottomFirst ? false : true;
	sortOrderButton.style.transform = `rotateX(${sortOrderButton.bottomFirst ? 180 : 0}deg)`;
	sortButtons.forEach((button) => {
		if (button.checked) {
			Main.sort(button.value, sortOrderButton.bottomFirst);
		}
	});
});

sortButtons.forEach((input) => {
	input.addEventListener("change", ()=> {
		Main.sort(input.value, sortOrderButton.bottomFirst);
	});
});

//Filteren met knoppies
filterButtons.forEach((input) => {
	input.addEventListener("change", ()=> {
		let minValue = 9999,
				maxValue = 0;
		filterButtons.forEach((button) => {
			if (button.checked) {
				minValue = (button.value < minValue) ? button.value : minValue;
				maxValue = (button.value > maxValue) ? button.value : maxValue;
			}
		});
		Main.filter("readingTime", minValue, maxValue);
		sortButtons.forEach((button) => {
			if (button.checked) {
				Main.sort(button.value, sortOrderButton.bottomFirst);
			}
		});
	});
});

//article header images
function getImage(url) {
	return new Promise(function (resolve, reject) {
		const img = new Image();
		img.src = url;
		img.addEventListener("load", () => {
			resolve(img);
		});
		img.addEventListener("error", () => {
			reject(url);
		});
	});
}

Main.articles.forEach((article) => {
	getImage(`../Images/backgrounds/${article.dataset.title}`).then((img) => {
		let oldImg = article.querySelector("header img");
		oldImg.parentElement.replaceChild(img, oldImg);
		img.classList.add("resolved");
	});
});

//Graag meteen sorteren aub ok dankjewel joeee
Main.sort("timesRead", true, false);
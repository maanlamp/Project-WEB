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
	article.paragraph = article.querySelector("p");
	article.words = article.paragraph.textContent.split(" ").length;
	article.readingTime = article.words / 250; //gemiddeld 250 woorden per minuut
	article.timesRead = Math.floor(Math.random() * 1000);
	article.dataset.timesSaved = article.timesSaved;
	article.dataset.timesRead = article.timesRead;
	article.dataset.readingTime = article.readingTime;
	article.querySelector("footer li:last-of-type").innerHTML += `${Math.round(article.readingTime)} minu${Math.round(article.readingTime) <= 1 ? "ut" : "ten"}`;
	if (article === document.querySelector("article:first-of-type")) {
		Main.trimSnippet(article, 1000);
	} else {
		Main.trimSnippet(article, 200);
	}
});

document.querySelectorAll("aside li>button, header li>button").forEach((button) => {
	button.addEventListener("click", deleteFilter);
});

document.querySelectorAll("header button").forEach((button) => {
	button.addEventListener("click", () => {
		event.preventDefault();
	});
});

document.querySelector("aside li:first-of-type").addEventListener("click", function () {
	event.preventDefault();
	let node = [
		document.createElement("li"),
		document.createElement("button"),
		document.createElement("img"),
		document.createElement("h2"),
		document.createElement("span")
	];

	let li = node[0];

	for (let i = 1; i < node.length; i++) {
		li.appendChild(node[i]);
	}
	li.children[0].textContent = "×";
	li.children[1].src = "Images/icon_hourglass.png";
	li.children[1].alt = "Filter: Leesduur";
	li.children[2].textContent = "Leesduur:";
	li.children[3].textContent = "5-10m";

	let ul = this.parentElement;
	ul.prepend(li);
	li.style = "animation: popIn .3s ease-out forwards;";

	li.addEventListener("animationend", removeStyle);
	li.children[0].addEventListener("click", deleteFilter);
});

Main.sort("timesRead", true);

//header
const filter = document.querySelector("aside form button");
filter.addEventListener("click", function () {
	if (this.parentElement.children[0].style.display === "" || this.parentElement.children[0].style.display === "none") {
		this.parentElement.children[0].style.display = "inline-block";
	} else {
		this.parentElement.children[0].style.display = "none";
	}
});

//article header images
function getImage(url) {
	return new Promise(function (resolve, reject) {
		const img = new Image();
		img.src = url;
		img.addEventListener("load", function () {
			resolve(img);
		});
		img.addEventListener("error", function () {
			reject(url);
		});
	});
}

let images = ["important.gif", "important.gif", "important.gif"];
for (let i = 0; i < images.length; i++) {
	getImage(`../Images/backgrounds/${images[i]}`).then((img) => {
		let oldImg = document.querySelector(`article:nth-of-type(${i + 1}) img`);
		oldImg.parentElement.replaceChild(img, oldImg);
		img.classList.add("resolved");
		Main.popIn(img, i * 3);
	});
}
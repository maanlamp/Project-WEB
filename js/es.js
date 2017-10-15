/*jshint esversion:6, browser: true, devel: true*/

import _Main from "./Main.js";
import {addArticles, deleteArticles} from "./Articles.js";
const Main = new _Main();

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

Main.articles().forEach((article) => {
	article.paragraph = article.querySelector("p");
	article.length = article.paragraph.textContent.length;
	article.words = article.paragraph.textContent.split(" ").length;
	article.readingTime = article.words / 250; //gemiddeld 250 woorden per minuut
	article.timesSaved = Math.floor(Math.random() * 1000);
	article.timesRead = Math.floor(Math.random() * 1000);
	article.dataset.timesSaved = article.timesSaved;
	article.dataset.timesRead = article.timesRead;
	article.dataset.readingTime = article.readingTime;
	Main.trimSnippet(article, 200);
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
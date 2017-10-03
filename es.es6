/*jshint esversion:6, browser: true, devel: true*/
const debug = {
	listArticles: () => {
		articles.forEach((article) => {
			console.groupCollapsed(article);
			console.log("Reading time:", article.readingTime);
			console.log("Times read:", article.timesRead);
			console.log("Times saved:", article.timesSaved);
			console.groupEnd();
		});
	}
};

function deleteFilter() {
	if (this.nodeName === "LI") {
		this.remove();
	} else {
		this.parentElement.remove();
	}
}

document.querySelectorAll("aside li>button, header li>button").forEach((button) => {
	button.addEventListener("click", deleteFilter);
});

document.querySelector("aside>form>button").addEventListener("click", function () {
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

	let ul = this.parentElement.children[0];
	ul.appendChild(li);
	li.style = "animation: popIn .3s ease-out forwards;";

	function removeStyle() {
		this.removeAttribute("style");
	}

	li.addEventListener("animationend", removeStyle);
	li.children[0].addEventListener("click", deleteFilter);
});

function trimSnippet(snippet, maxLength) {
	if (snippet.length < maxLength) {
		return;
	} else {
		const text = snippet.paragraph.textContent.slice(0, maxLength) + "&hellip;";
		snippet.paragraph.innerHTML = text;
	}
}

const articles = document.querySelectorAll("main article");
articles.forEach((article) => {
	article.paragraph = article.querySelector("p");
	article.length = article.paragraph.textContent.length;
	article.words = article.paragraph.textContent.split(" ").length;
	article.readingTime = article.words / 250; //gemiddeld 250 woorden per minuut
	article.timesSaved = Math.floor(Math.random() * 1000);
	article.timesRead = Math.floor(Math.random() * 1000);
	article.dataset.timesSaved = article.timesSaved;
	article.dataset.timesRead = article.timesRead;
	article.dataset.readingTime = article.readingTime;
	trimSnippet(article, 150);
});

function sort(sortBy, highestFirst) {
	let temp = Array.prototype.slice.call(articles);
	temp.sort((a, b) => {
		if (highestFirst) {
			return (a[sortBy] < b[sortBy]) ? 1 : -1;
		} else {
			return (a[sortBy] > b[sortBy]) ? 1 : -1;
		}
	});
	for (let i = 0; i < temp.length; i++) {
		temp[i].style.order = i;
	}
}

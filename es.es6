/*jshint esversion:6, browser: true, devel: true*/

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

const Main = {
	trimSnippet: (snippet, maxLength) => {
		if (snippet.length < maxLength) {
			return;
		} else {
			const text = `${snippet.paragraph.textContent.slice(0, maxLength)}&hellip;`;
			snippet.paragraph.innerHTML = text;
		}
	},
	
	articles: document.querySelectorAll("main article"),
	
	sort: (by, highestFirst) => {
		let temp = Array.prototype.slice.call(Main.articles);
		temp.sort((a, b) => {
			if (highestFirst) {
				return (a[by] < b[by]) ? 1 : -1;
			} else {
				return (a[by] > b[by]) ? 1 : -1;
			}
		});
		let pos = 0;
		for (let i = 0; i < temp.length; i++) {
			console.log(temp[i], temp[i].style.visibility);
			if (temp[i].style.visibility === "hidden") {
				temp[i].style.order = pos++;
			}
		}
	},
	
	filter: (by, min, max) => {
		for (let i = 0; i < Main.articles.length; i++) {
			let article = Main.articles[i];
			Main.popOut(article, i);
			if (article.dataset[by] >= min && article.dataset[by] <= max) {
				Main.popIn(article, i);
			}
		}
	},
	
	popOut: (thing, delay) => {
		delay /= 50;
		thing.style = `padding: 0; animation: popOut .3s ease-out ${delay}s forwards;`;
	},
	
	popIn: (thing, delay) => {
		delay /= 50;
		thing.style = `visibility: hidden; animation: popIn .3s ease-out ${delay}s forwards;`;
	}
};

const DEBUG = {
	listArticles: () => {
		this.articles.forEach((article) => {
			console.groupCollapsed(article);
			console.log("Reading time:", article.readingTime);
			console.log("Times read:", article.timesRead);
			console.log("Times saved:", article.timesSaved);
			console.groupEnd();
		});
	}
};

Main.articles.forEach((article) => {
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

	li.addEventListener("animationend", removeStyle);
	li.children[0].addEventListener("click", deleteFilter);
});

Main.sort("timesRead", true);
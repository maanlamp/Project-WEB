/*jshint esversion:6, browser: true, devel: true*/

export default class Main {
	get articles() {
		return document.querySelectorAll("main article");
	}
	
	fixArticles() {
		this.articles.forEach((article) => {
			if (article.dataset.order === "0") {
				article.classList.add("first");
			} else {
				article.classList.remove("first");
			}
			this.trimSnippet(article, 150, 500);
		});
	}
	
	trimSnippet(snippet, minLength, maxLength) {
		if (snippet.length < maxLength) {
			return;
		} else {
			const text = `${snippet.paragraph.textContent.slice(0, (snippet === document.querySelector("article.first")) ? maxLength : minLength)}&hellip;`;
			if (snippet.querySelectorAll("p").length < 2) {
				const newParagraph = document.createElement("P");
				newParagraph.innerHTML = text;
				snippet.paragraph.parentElement.insertBefore(newParagraph, snippet.paragraph);
			} else {
				const actualSnippet = snippet.querySelector("p:first-of-type");
				actualSnippet.innerHTML = text;
			}
		}
	}

	sort(by, highestFirst, animate = true) {
		const temp = Array.prototype.slice.call(this.articles);
		temp.sort((a, b) => {
			if (highestFirst) {
				return (a[by] < b[by]) ? 1 : -1;
			} else {
				return (a[by] > b[by]) ? 1 : -1;
			}
		});
		let pos = 0;
		for (let i = 0; i < temp.length; i++) {
			if (animate) {
				this.popOut(temp[i], i);
			}
			temp[i].dataset.order = pos++;
			setTimeout(() => {
				this.fixArticles();
				if (animate) {
					this.popIn(temp[i], i);
				}
				temp[i].style.order = temp[i].dataset.order;
			}, (this.articles.length * 100) * (animate) ? 0 : 1);
		}
	}

	filter(by, min, max) {
		for (let i = 0; i < this.articles.length; i++) {
			let article = this.articles[i];
			this.popOut(article, i);
			if (article.dataset[by] >= min && article.dataset[by] <= max) {
				this.popIn(article, i);
			}
		}
		this.fixArticles();
	}

	popOut(thing, delay) {
		delay /= 20;
		thing.style = `padding: 0; animation: popOut .3s ease-out ${delay}s forwards;`;
	}

	popIn(thing, delay) {
		delay /= 20;
		thing.style = `visibility: hidden; animation: popIn .3s ease-out ${delay}s forwards;`;
	}
}
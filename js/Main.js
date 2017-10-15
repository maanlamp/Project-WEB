/*jshint esversion:6, browser: true, devel: true*/

export default class Main {
	trimSnippet(snippet, maxLength) {
		if (snippet.length < maxLength) {
			return;
		} else {
			const text = `${snippet.paragraph.textContent.slice(0, maxLength)}&hellip;`;
			snippet.paragraph.innerHTML = text;
		}
	}

	articles() {
		return document.querySelectorAll("main article");
	}

	sort(by, highestFirst) {
		let temp = Array.prototype.slice.call(this.articles);
		temp.sort((a, b) => {
			if (highestFirst) {
				return (a[by] < b[by]) ? 1 : -1;
			} else {
				return (a[by] > b[by]) ? 1 : -1;
			}
		});
		let pos = 0;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].style.visibility === "hidden") {
				temp[i].style.order = pos++;
			}
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
	}

	popOut(thing, delay) {
		delay /= 50;
		thing.style = `padding: 0; animation: popOut .3s ease-out ${delay}s forwards;`;
	}

	popIn(thing, delay) {
		delay /= 50;
		thing.style = `visibility: hidden; animation: popIn .3s ease-out ${delay}s forwards;`;
	}
}
/*jshint esversion:6, browser: true, devel: true*/

import _Main from "./Main.js";
const Main = new _Main();

export function addArticles() {
	function deleteSelf() {
		this.remove();
	}

	document.querySelectorAll("article button").forEach((button) => {
		button.addEventListener("click", function () {
			const article = this.parentElement.parentElement,
						fakeArticle = article.cloneNode(true),
						main = document.querySelector("main");
			fakeArticle.querySelector("button").remove();
			main.append(fakeArticle);
			fakeArticle.style.position = "absolute";
			fakeArticle.style.top = `${article.offsetTop - 4.5}px`;
			fakeArticle.style.left = `${article.getBoundingClientRect().left - 4.5}px`;
			fakeArticle.style.zIndex = "99";
			fakeArticle.style.transition = "all 3s ease-out";
			fakeArticle.style.transformOrigin = "0px 0px";
			fakeArticle.style.transform = `translate(${window.innerWidth - article.getBoundingClientRect().right}px, -${article.getBoundingClientRect().top}px) scale(.2)`;
		});
	});
}

export function deleteArticles() {
	const prullenbakkies = document.querySelectorAll("article button");
	if (prullenbakkies) {
		prullenbakkies.forEach((prullenbak) => {
			prullenbak.addEventListener("click", function () {
				Main.popOut(this.parentNode.parentNode, 0);
				setTimeout(() => {
					this.parentNode.parentNode.remove();
				}, 300);
			});
		});
	}
}
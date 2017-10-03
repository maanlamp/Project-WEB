/*jshint esversion:6, browser: true, devel: true*/
function deleteFilter(){
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

const articleArray = document.querySelectorAll("article");
articleArray.forEach((article) => {
	const p = article.querySelector("p"),
		maxLength = 75;
	article.setAttribute("data-filter", `len:${p.textContent.length}`);
	if (p.textContent.length < maxLength) {
		return;
	} else {
		const text = p.textContent.slice(0, maxLength) + "...";
		p.innerHTML = text;
	}
});
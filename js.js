function deleteFilter() {
	(this.nodeName == "LI") ? this.remove(): this.parentElement.remove();
};

document.querySelectorAll("aside li>button, header li>button").forEach((button) => {
	button.addEventListener("click", deleteFilter);
});

document.querySelector("aside>button").addEventListener("click", function () {
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
	li.className = "popIn";

	function removeClasses() {
		this.removeAttribute("class");
	};

	li.addEventListener("animationend", removeClasses);
	li.children[0].addEventListener("click", deleteFilter);
});

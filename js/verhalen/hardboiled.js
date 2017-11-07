const fonts = ["Painterz", "freshmarker", "adrip1", "amsterdam"];

function isOnscreen(item) {
	let rect = item.getBoundingClientRect();
	return (rect.top > 0 && rect.bottom < window.innerHeight);
}

window.addEventListener("scroll", () => {
	document.querySelectorAll("span.scheldwoord").forEach(item => {
		if (isOnscreen(item)) {
			let rand = Math.random()*20;
			if (!item.dataset.animated) {
				item.style.transform = `skewX(-${Math.random()*20}deg) rotate(${rand}deg) translateX(0px)`;
				item.style.marginBottom = `${rand / Math.PI}rem`;
				item.style.fontFamily = `${fonts[Math.floor(Math.random() * fonts.length)]}`;
				document.querySelector("main img").style.transform = "rotate(-90deg)";
				setTimeout(() => {
					document.querySelector("main img").style.transform = "rotate(0deg)";
				}, 100);
				item.dataset.animated = true;
			}
		}
	});
});
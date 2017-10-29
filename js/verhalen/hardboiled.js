const paragraphs = document.querySelectorAll("main p"),
			title = document.querySelector("main h1"),
			fonts = ["adrip1", "amsterdam", "freshmarker", "Painterz"],
			colours = ["CE1800", "62A560", "4425A3", "3F67A3"];

function stylise(element, randomInt) {
	const font = fonts[randomInt],
				colour = colours[randomInt];
	element.style.fontFamily = font;
	element.style.color = `#${colour}`;
	element.style.textShadow = `0 0 2px #${colour}`;
}

paragraphs.forEach((p) => {
	const wordArray = p.textContent.split(" ");
	p.innerHTML = "";
	wordArray.forEach((word) => {
		const span = document.createElement("SPAN"),
					randomInt = Math.floor(Math.random() * fonts.length);
		span.textContent = word;
		p.appendChild(span);
		span.style.fontSize = `calc(1.3rem  + ${randomInt / 3}vw)`;
		stylise(span, randomInt);
	});
});

stylise(title, Math.floor(Math.random() * 4));
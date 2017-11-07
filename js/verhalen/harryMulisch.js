const paragraphs = document.querySelectorAll("p");

paragraphs.forEach((p) => {
	const wordArray = p.textContent.split(/\b/);
	p.innerHTML = "";
	wordArray.forEach((word) => {
		const span = document.createElement("SPAN");
		span.textContent = word;
		if (word.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)) {
			span.classList.add("interpunctie");
		} else if (word.match(/\s/g)) {
			span.classList.add("spatie");
		}
		p.appendChild(span);
	});
});

function displace(element) {
	const rand = {
		x: Math.floor(Math.random() * 20),
		y: Math.floor(Math.random() * 20)
	};
	element.style.transform = `translate(${rand.x}px, ${rand.y}px)`;
}

setInterval(() => {
	document.querySelectorAll("main span").forEach((span) => {
		displace(span);
	});
}, 5000);
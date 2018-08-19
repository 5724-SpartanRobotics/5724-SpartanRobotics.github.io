function next(slideshow) {
	clearTimeout(slideshow.nextTimeout);
	slideshow.idx++;
	updateSlideshow(slideshow);
	if (!slideshow.paused) {
		setTimeout(next, slideshow.waitLen, slideshow);
	}
}

function prev(slideshow) {
	clearTimeout(slideshow.nextTimeout);
	slideshow.idx--;
	updateSlideshow(slideshow);
	
	if (!slideshow.paused) {
		setTimeout(next, slideshow.waitLen, slideshow);
	}
}

function pause(slideshow) {
	clearTimeout(slideshow.nextTimeout);
	slideshow.paused = !slideshow.paused;
	
	slideshow.controls.children[1].innerHTML = slideshow.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
	
	if (!slideshow.paused) {
		setTimeout(next, slideshow.waitLen, slideshow);
	}
}

function updateSlideshow(slideshow) {
	while (slideshow.idx < 0) {
		slideshow.idx += slideshow.slides.length;
	}
	
	slideshow.idx %= slideshow.slides.length;
	
	for (let i = 0; i < slideshow.slides.length; i++) {
		if (i == slideshow.idx) {
			slideshow.slides[i].classList.remove("invisible-stuff");
		} else if (!slideshow.slides[i].classList.contains("invisible-stuff")) {
			slideshow.slides[i].classList.add("invisible-stuff")
		}
	}
}

function onHover(slideshow) {
	if (!slideshow.controls.classList.contains("invisible-stuff")) {
		slideshow.controls.classList.add("invisible-stuff");
	} else {
		slideshow.controls.classList.remove("invisible-stuff");
	}
}

function runSlideshow(el, waitLen) {
	let controls = document.createElement("div");
	
	controls.classList.add("slide-controls");
	controls.classList.add("ignore");
	controls.classList.add("invisible-stuff");
	
	let prevBtn = document.createElement("button");
	let pauseBtn = document.createElement("button");
	let nextBtn = document.createElement("button");
	prevBtn.innerHTML = '<i class="fas fa-caret-left"></i>';
	pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
	nextBtn.innerHTML = '<i class="fas fa-caret-right"></i>';
	
	controls.appendChild(prevBtn);
	controls.appendChild(pauseBtn);
	controls.appendChild(nextBtn);
	
	el.appendChild(controls);
	
	let slideshow = {
		el: el,
		waitLen: waitLen,
		controls: controls,
		nextTimeout: 0,
		paused: false,
		idx: 0,
		slides: []
	};
	
	for (let i = 0; i < el.children.length; i++) {
		if(!el.children[i].classList.contains("ignore")) {
			slideshow.slides.push(el.children[i]);
		}
	}
	
	prevBtn.onclick = function() { prev(slideshow); };
	pauseBtn.onclick = function() { pause(slideshow); };
	nextBtn.onclick = function() { next(slideshow); };
	slideshow.el.onmouseover = function() { onHover(slideshow) };
	
	updateSlideshow(slideshow);
	setTimeout(next, slideshow.waitLen, slideshow);
}

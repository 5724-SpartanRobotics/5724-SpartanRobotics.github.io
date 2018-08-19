function next(slideshow) {
	clearTimeout(slideshow.nextTimeout);
	slideshow.idx++;
	updateSlideshow(slideshow);
	if (!slideshow.paused) {
		slideshow.nextTimeout = setTimeout(next, slideshow.waitLen, slideshow);
	}
}

function prev(slideshow) {
	clearTimeout(slideshow.nextTimeout);
	slideshow.idx--;
	updateSlideshow(slideshow);
	
	if (!slideshow.paused) {
		slideshow.nextTimeout = setTimeout(next, slideshow.waitLen, slideshow);
	}
}

function pause(slideshow) {
	clearTimeout(slideshow.nextTimeout);
	slideshow.paused = !slideshow.paused;
	
	slideshow.controls.children[1].innerHTML = slideshow.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
	
	if (!slideshow.paused) {
		slideshow.nextTimeout = setTimeout(next, slideshow.waitLen, slideshow);
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
	clearTimeout(slideshow.controlFadeTimeout);
	
	if (slideshow.controls.classList.contains("invisible-stuff")) {
		slideshow.controls.classList.remove("invisible-stuff");
	}
}

function isParentOf(possibleParent, el) {
	let parent = el.parentElement;
	
	while (parent) {
		if (parent == possibleParent) {
			return true;
		}
		parent = parent.parentElement;
	}
	
	return false;
}

function fadeControls(slideshow) {
	slideshow.controls.classList.add("invisible-stuff");
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
		slides: [],
		controlFadeTimeout: 0
	};
	
	for (let i = 0; i < el.children.length; i++) {
		if(!el.children[i].classList.contains("ignore")) {
			slideshow.slides.push(el.children[i]);
		}
	}
	
	prevBtn.onclick = function() { prev(slideshow); };
	pauseBtn.onclick = function() { pause(slideshow); };
	nextBtn.onclick = function() { next(slideshow); };
	slideshow.el.onmouseenter = function() { onHover(slideshow); };
	slideshow.el.onmouseout = function(e) { if (!isParentOf(slideshow.el, e.relatedTarget)) slideshow.controlFadeTimeout = setTimeout(fadeControls, 2000, slideshow); };
	
	updateSlideshow(slideshow);
	slideshow.nextTimeout = setTimeout(next, slideshow.waitLen, slideshow);
}

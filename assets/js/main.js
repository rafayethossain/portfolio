/* ==========================================================================
   Rafayet Hossain — Portfolio interactions
   Vanilla JS. No dependencies. GitHub Pages safe.
   All motion honors prefers-reduced-motion.
   ========================================================================== */
(function () {
	"use strict";

	var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

	/* ---------- Preloader ---------- */
	function initPreloader() {
		var pre = document.getElementById("preloader");
		if (!pre) return;
		if (reduceMotion) {
			pre.remove();
			return;
		}
		window.addEventListener("load", function () {
			setTimeout(function () {
				pre.classList.add("is-done");
				setTimeout(function () {
					if (pre.parentNode) pre.parentNode.removeChild(pre);
					// trigger any above-the-fold reveals
					document.querySelectorAll(".hero [data-reveal]").forEach(function (el, i) {
						setTimeout(function () { el.classList.add("is-visible"); }, 80 * i);
					});
				}, 700);
			}, 1100);
		});
		// Safety: never trap the user behind the loader
		setTimeout(function () {
			if (document.getElementById("preloader")) {
				pre.classList.add("is-done");
			}
		}, 4000);
	}

	/* ---------- Custom cursor ---------- */
	function initCursor() {
		if (!finePointer || reduceMotion) return;
		var cursor = document.getElementById("cursor");
		var dot = document.getElementById("cursorDot");
		if (!cursor || !dot) return;

		var mouseX = 0, mouseY = 0, curX = 0, curY = 0, raf = null;

		function render() {
			curX += (mouseX - curX) * 0.18;
			curY += (mouseY - curY) * 0.18;
			cursor.style.transform = "translate(" + curX + "px," + curY + "px) translate(-50%,-50%)";
			dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
			raf = requestAnimationFrame(render);
		}

		document.addEventListener("mousemove", function (e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			document.body.classList.add("cursor-ready");
			if (!raf) render();
		});

		var hoverTargets = "a, button, .case, .service, .insight, .magnetic";
		document.addEventListener("mouseover", function (e) {
			if (e.target.closest(hoverTargets)) cursor.classList.add("is-hover");
		});
		document.addEventListener("mouseout", function (e) {
			if (e.target.closest(hoverTargets)) cursor.classList.remove("is-hover");
		});

		document.addEventListener("mouseleave", function () {
			document.body.classList.remove("cursor-ready");
		});
		document.addEventListener("mouseenter", function () {
			document.body.classList.add("cursor-ready");
		});
	}

	/* ---------- Scroll progress + nav state ---------- */
	function initScrollUI() {
		var nav = document.getElementById("nav");
		var progress = document.querySelector(".progress span");
		var ticking = false;

		function update() {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			var docHeight = document.documentElement.scrollHeight - window.innerHeight;
			var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			if (progress) progress.style.width = pct + "%";
			if (nav) {
				if (scrollTop > 30) nav.classList.add("is-scrolled");
				else nav.classList.remove("is-scrolled");
			}
			ticking = false;
		}

		window.addEventListener("scroll", function () {
			if (!ticking) {
				window.requestAnimationFrame(update);
				ticking = true;
			}
		}, { passive: true });
		update();
	}

	/* ---------- Mobile menu ---------- */
	function initMobileMenu() {
		var burger = document.getElementById("navBurger");
		var menu = document.getElementById("mobileMenu");
		if (!burger || !menu) return;
		var open = false;

		function setOpen(state) {
			open = state;
			burger.classList.toggle("is-open", state);
			menu.classList.toggle("is-open", state);
			burger.setAttribute("aria-expanded", String(state));
			burger.setAttribute("aria-label", state ? "Close menu" : "Open menu");
			menu.setAttribute("aria-hidden", String(!state));
			document.body.style.overflow = state ? "hidden" : "";
		}

		burger.addEventListener("click", function () {
			setOpen(!open);
		});

		menu.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () { setOpen(false); });
		});

		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape" && open) setOpen(false);
		});
	}

	/* ---------- Reveal on scroll ---------- */
	function initReveal() {
		var items = document.querySelectorAll("[data-reveal]");
		if (!items.length) return;

		if (reduceMotion || !("IntersectionObserver" in window)) {
			items.forEach(function (el) { el.classList.add("is-visible"); });
			return;
		}

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					var el = entry.target;
					// stagger siblings slightly
					var siblings = Array.prototype.slice.call(el.parentNode.children)
						.filter(function (c) { return c.hasAttribute && c.hasAttribute("data-reveal"); });
					var idx = siblings.indexOf(el);
					el.style.transitionDelay = (Math.min(idx, 6) * 0.06) + "s";
					el.classList.add("is-visible");
					observer.unobserve(el);
				}
			});
		}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

		items.forEach(function (el) { observer.observe(el); });
	}

	/* ---------- Animated counters ---------- */
	function initCounters() {
		var nums = document.querySelectorAll("[data-count]");
		if (!nums.length) return;

		function animate(el) {
			var target = parseFloat(el.getAttribute("data-count"));
			var suffix = el.getAttribute("data-suffix") || "";
			if (reduceMotion) {
				el.textContent = target + suffix;
				return;
			}
			var duration = 1600;
			var start = null;
			function step(ts) {
				if (!start) start = ts;
				var p = Math.min((ts - start) / duration, 1);
				// easeOutExpo
				var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
				el.textContent = Math.round(target * eased) + suffix;
				if (p < 1) requestAnimationFrame(step);
				else el.textContent = target + suffix;
			}
			requestAnimationFrame(step);
		}

		if (!("IntersectionObserver" in window)) {
			nums.forEach(animate);
			return;
		}

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					animate(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });

		nums.forEach(function (el) { observer.observe(el); });
	}

	/* ---------- Magnetic buttons ---------- */
	function initMagnetic() {
		if (!finePointer || reduceMotion) return;
		var els = document.querySelectorAll(".magnetic");
		if (!els.length) return;

		els.forEach(function (el) {
			var strength = 0.35;
			el.addEventListener("mousemove", function (e) {
				var rect = el.getBoundingClientRect();
				var x = e.clientX - rect.left - rect.width / 2;
				var y = e.clientY - rect.top - rect.height / 2;
				el.style.transform = "translate(" + (x * strength) + "px," + (y * strength) + "px)";
			});
			el.addEventListener("mouseleave", function () {
				el.style.transform = "";
			});
		});
	}

	/* ---------- Hero parallax ---------- */
	function initHeroParallax() {
		if (reduceMotion) return;
		var visual = document.querySelector(".hero__visual");
		var heroImg = document.getElementById("heroImg");
		if (!visual || !heroImg) return;
		var ticking = false;

		window.addEventListener("scroll", function () {
			if (!ticking) {
				window.requestAnimationFrame(function () {
					var y = window.pageYOffset;
					if (y < window.innerHeight) {
						heroImg.style.transform = "translateY(" + (y * 0.08) + "px)";
					}
					ticking = false;
				});
				ticking = true;
			}
		}, { passive: true });
	}

	/* ---------- Smooth anchor scroll (offset for fixed nav) ---------- */
	function initSmoothScroll() {
		var links = document.querySelectorAll('a[href^="#"]');
		links.forEach(function (link) {
			link.addEventListener("click", function (e) {
				var id = link.getAttribute("href");
				if (id === "#" || id.length < 2) return;
				var target = document.querySelector(id);
				if (!target) return;
				e.preventDefault();
				var navHeight = (document.getElementById("nav") || {}).offsetHeight || 0;
				var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
				window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
				// update focus for a11y without jump
				if (history.pushState) history.pushState(null, "", id);
			});
		});
	}

	/* ---------- Video lightbox ---------- */
	function initLightbox() {
		var lightbox = document.getElementById("lightbox");
		var frame = document.getElementById("lightboxFrame");
		if (!lightbox || !frame) return;

		var lastTrigger = null;

		function open(videoId, trigger) {
			lastTrigger = trigger || null;
			var src = "https://www.youtube.com/embed/" +
				encodeURIComponent(videoId) + "?autoplay=1&rel=0&playsinline=1";
			if (window.location && /^https?:$/.test(window.location.protocol)) {
				src += "&origin=" + encodeURIComponent(window.location.origin);
			}
			frame.src = src;
			lightbox.classList.add("is-open");
			lightbox.setAttribute("aria-hidden", "false");
			document.body.style.overflow = "hidden";
			var closeBtn = lightbox.querySelector(".lightbox__close");
			if (closeBtn) closeBtn.focus();
		}

		function close() {
			lightbox.classList.remove("is-open");
			lightbox.setAttribute("aria-hidden", "true");
			frame.src = "about:blank"; // stop playback
			document.body.style.overflow = "";
			if (lastTrigger && typeof lastTrigger.focus === "function") {
				lastTrigger.focus();
			}
			lastTrigger = null;
		}

		document.querySelectorAll("[data-video]").forEach(function (el) {
			el.addEventListener("click", function (e) {
				e.preventDefault();
				open(el.getAttribute("data-video"), el);
			});
		});

		lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
			el.addEventListener("click", close);
		});

		document.addEventListener("keydown", function (e) {
			if (!lightbox.classList.contains("is-open")) return;
			if (e.key === "Escape") close();
			// simple focus loop inside the panel
			if (e.key === "Tab") {
				var focusables = lightbox.querySelectorAll("button, iframe, [href]");
				if (!focusables.length) return;
				var first = focusables[0];
				var last = focusables[focusables.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		});
	}

	/* ---------- Footer year ---------- */
	function initYear() {
		var year = document.getElementById("year");
		if (year) year.textContent = new Date().getFullYear();
	}

	/* ---------- Boot ---------- */
	function boot() {
		initPreloader();
		initCursor();
		initScrollUI();
		initMobileMenu();
		initReveal();
		initCounters();
		initMagnetic();
		initHeroParallax();
		initSmoothScroll();
		initLightbox();
		initYear();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", boot);
	} else {
		boot();
	}
})();
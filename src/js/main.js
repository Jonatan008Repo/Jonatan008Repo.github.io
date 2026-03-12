/**
 * main.js
 * - Intersection Observer: animaciones de entrada reveal
 * - Nav: marcar enlace activo según sección visible
 * - Nav: clase sticky con blur al hacer scroll
 */

/* ── 1. Animaciones de entrada ─────────────────────────────── */
const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				revealObserver.unobserve(entry.target); // solo una vez
			}
		});
	},
	{ threshold: 0.12 }
);

document
	.querySelectorAll(".reveal")
	.forEach((el) => revealObserver.observe(el));

/* ── 2. Nav activa según sección en viewport ───────────────── */
// Estrategia: la sección activa es la última cuyo top
// ha cruzado el 30% superior del viewport.
// Funciona correctamente con secciones de cualquier altura.
const navLinks = document.querySelectorAll("nav a[href^='#']");
const sections = Array.from(document.querySelectorAll("main > section[id]"));

function setActiveLink() {
	const scrollY = window.scrollY;
	const threshold = window.innerHeight * 0.3;

	// Sección cuyo top está más cerca (por encima) del threshold
	let current = sections[0];
	for (const section of sections) {
		if (section.getBoundingClientRect().top <= threshold) {
			current = section;
		}
	}

	navLinks.forEach((link) => {
		link.classList.toggle(
			"nav__link--active",
			link.getAttribute("href") === `#${current.id}`
		);
	});
}

window.addEventListener("scroll", setActiveLink, { passive: true });
// Ejecutar al cargar para marcar el estado inicial
setActiveLink();

/* ── 3. Nav sticky con fondo blur al hacer scroll ─────────── */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
	header.classList.toggle("header--scrolled", window.scrollY > 40);
});

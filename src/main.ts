import './style.css'
import { UI } from "@peasy-lib/peasy-ui";
import { missNorishre } from "@jmnuf/norishre";
import type { LinksPageComponent } from './pages/links';
import type { AboutPageComponent } from './pages/about';
import type { HomePageComponent } from './pages/home';


const pages = {
	home: null as unknown as HomePageComponent,
	about: null as unknown as AboutPageComponent,
	links: null as unknown as LinksPageComponent,
};

const mistress = missNorishre({
	home: {
		path: "/",
		async model() {
			const { home } = await import("./pages/home");
			pages.home = home;
			return home;
		},
	},
	about: {
		path: "/about",
		async model() {
			const { about } = await import("./pages/about");
			pages.about = about;
			return about;
		}
	},
	links: {
		path: "/links",
		async model() {
			const script = await import("./pages/links");
			pages.links = script.links;
			return script.links;
		}
	}
});

// Check to wait till the active page is downloaded
(async function run() {
	const time_id = `Initial ${location.pathname} page load time`;
	console.time(time_id);
	void await mistress.loadDrawnArrow();
	console.timeEnd(time_id);
	
	const nav_links = [
		mistress.new_link("home"),
		mistress.new_link("about"),
		mistress.new_link("links"),
	];
	
	const app = {
		nav_links,
		ranger: mistress,
		pages,
	};
	
	const app_template = document.querySelector("#app-template")!;
	
	UI.create(document.body, app_template, app);
	
	app_template.remove();
	
	// @ts-ignore
	window.norishre = mistress;
})();

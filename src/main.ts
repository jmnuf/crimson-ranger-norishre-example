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
	const base_page = mistress.find_arrow_id_by_url();
	if (!(base_page in mistress.models) && base_page !== "%404%") {
		const time_id = `Initial ${base_page} page load time`;
		console.time(time_id);
		await mistress.pull_from_quiver(base_page);
		let loaded = (base_page in mistress.models);
		while (!loaded) {
			void await new Promise(res => setTimeout(res, 10));
			loaded = (base_page in mistress.models);
		}
		console.timeEnd(time_id);
	}
	
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

import './style.css'
import { UI } from "@peasy-lib/peasy-ui";
import { Norishre } from "@jmnuf/norishre";
import type { LinksPageComponent } from './links';
import type { AboutPageComponent } from './about';

const home = {
	template: `<h1>Home page</h1>`,
};

const pages = {
	home, about: null as unknown as AboutPageComponent,
	links: null as unknown as LinksPageComponent,
};

const ranger = new Norishre({
	home: {
		loaded: true,
		path: "/",
		model: home
	},
	about: {
		loaded: false,
		path: "/about",
		async load() {
			const { about } = await import("./about");
			pages.about = about;
			return about;
		},
	},
	links: {
		loaded: false,
		path: "/links",
		load: async () => {
			const script = await import("./links");
			pages.links = script.links;
			return script.links;
		}
	}
});

const base_page = ranger.find_arrow_id_by_url();

if (!(base_page in ranger.models) && base_page !== "%404%") {
	const time_id = `Loading page ${base_page}`;
	console.time(time_id)
	await ranger.pull_from_quiver(base_page);
	let loaded = (base_page in ranger.models);
	while (!loaded) {
		await new Promise(res => setTimeout(res, 10));
		console.log(base_page, ranger.models);
		loaded = (base_page in ranger.models);
	}
	console.timeEnd(time_id);
}

const nav_links = [
	ranger.new_link("home"),
	ranger.new_link("about"),
	ranger.new_link("links"),
];

console.log(nav_links);

const app = {
	nav_links,
	ranger,
	pages,
};

const app_template = document.querySelector("#app-template")!;

UI.create(document.body, app_template, app);

app_template.remove();

// @ts-ignore
window.norishre = ranger;

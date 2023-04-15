export const about = {
	template: `
	<div>
	<h1>About Me page</h1>
	<p pui="parragraph <=* information">
		\${parragraph}
	</p>
	</div>
	`,
	information: [
		"This is an example about page where stuff about a person or team or thing goes to I suppose",
		"There's many ways to write your about, it could be very professional sounding, semi-casual, fully casual and straight outta of a video game or movie. I'm sure you can figure out how to sound unique in this world of sameness.",
		"I'm sure you'll find much to write here, like that pet you had as a kid that somehow inspired you to start pursuing a multi-billion dollar idea that eventually flopped and you still think about it years later. Don't worry it was your fault and there's no point in grueling over it cause your past mistakes are just failures and impossible to redeem acts that help build a better you or something like that, I don't know get your life in together and figure if it was worth it after that.",
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem labore accusamus recusandae cum at nam nihil, dolores expedita praesentium enim quod soluta doloribus quisquam explicabo nostrum earum quibusdam impedit provident."
	]
};

export type AboutPageComponent = typeof about;

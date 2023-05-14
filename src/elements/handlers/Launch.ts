import { Handler } from "../../structures";

export default new Handler({
	name: "Launch",

	run: async ({ client }): Promise<void> => {
		console.log("[BOT] | Launching...");

		client.once("ready", async () => {
			const ToPrint = [
				`[BOT] | ✅ ${client.user!.tag} started!`,
				`[BOT] | Information:`,
				`\t ID: ${client.user!.id}`,
			];

			console.log(ToPrint.join("\n"));
		});

		console.log("[BOT] | Launched!");
	},
});

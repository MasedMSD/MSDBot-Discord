import { Handler, SlashCommand } from "../../../structures";
import { importFile } from "../../../modules";
import { REST, Routes } from "discord.js";
import { resolve } from "path";
import { glob } from "glob";

export default new Handler({
	name: "PreloadSlashCommands",

	run: async ({ client }) => {
		const rest = new REST({ version: "10" }).setToken(client.token!);

		const slash_commands: string[] = await glob("Slash-commands/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (slash_commands.length <= 0) {
			await rest.put(Routes.applicationCommands(client.application!.id), {
				body: [],
			});

			return console.log("[HANDLING] | У вас нет ни одной слеш команды!");
		}

		const slash_commands_array = slash_commands.map(async <P extends string>(filePath: P) => {
			const command: SlashCommand = await importFile(resolve(process.cwd(), "src", "elements", filePath));
			client.slash_commands.set(command.name, command);

			return command;
		});

		await rest.put(Routes.applicationCommands(client.application!.id), {
			body: await Promise.all(slash_commands_array),
		});
	},
});

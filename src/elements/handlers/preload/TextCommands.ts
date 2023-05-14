import { Handler, TextCommand } from "../../../structures";
import { importFile } from "../../../modules";
import { resolve } from "path";
import { glob } from "glob";

export default new Handler({
	name: "PreloadTextCommands",

	run: async ({ client }) => {
		const text_commands: string[] = await glob("text-commands/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (text_commands.length <= 0) return console.log("[HANDLING] | У вас нет ни одной текстовой комманды!");

		text_commands.forEach(async <P extends string>(filePath: P) => {
			const text_command: TextCommand = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			client.text_commands.set(text_command.name, text_command);
		});
	},
});

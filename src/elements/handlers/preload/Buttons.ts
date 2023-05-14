import { Handler, Button } from "../../../structures";
import { importFile } from "../../../modules";
import { resolve } from "path";
import { glob } from "glob";

export default new Handler({
	name: "PreloadButtons",

	run: async ({ client }) => {
		const buttons: string[] = await glob("buttons/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (buttons.length <= 0) return console.log("[HANDLING] | У вас нет ни одной кнопки!");

		buttons.forEach(async <P extends string>(filePath: P) => {
			const button: Button = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			client.buttons.set(button.name, button);
		});
	},
});

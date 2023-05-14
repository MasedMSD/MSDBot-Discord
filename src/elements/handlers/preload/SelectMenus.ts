import { Handler, SelectMenu } from "../../../structures";
import { importFile } from "../../../modules";
import { resolve } from "path";
import { glob } from "glob";

export default new Handler({
	name: "PreloadSelectMenus",

	run: async ({ client }) => {
		const select_menus: string[] = await glob("select-menus/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (select_menus.length <= 0) return console.log("[HANDLING] | У вас нет ни одного выпающего списка!");

		select_menus.forEach(async <P extends string>(filePath: P) => {
			const select_menu: SelectMenu = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			client.select_menus.set(select_menu.name, select_menu);
		});
	},
});

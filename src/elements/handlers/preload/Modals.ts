import { Handler, Modal } from "../../../structures";
import { importFile } from "../../../modules";
import { resolve } from "path";
import { glob } from "glob";

export default new Handler({
	name: "PreloadModals",

	run: async ({ client }) => {
		const modals: string[] = await glob("modals/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (modals.length <= 0) return console.log("[HANDLING] | У вас нет ни одного модального окна!");

		modals.forEach(async <P extends string>(filePath: P) => {
			const modal: Modal = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			client.modals.set(modal.name, modal);
		});
	},
});

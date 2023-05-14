import { Handler } from "../../structures";

export default new Handler({
	name: "ErrorHandling",

	run: async (): Promise<void> => {
		process.on("uncaughtExceptionMonitor", (error, p) => console.error(`${error} \n\n${p}`));
		process.on("uncaughtException", (error, p) => console.error(`${error} \n\n${p}`));
		process.on("unhandledRejection", (error, p) => console.error(`${error} \n\n${p}`));
	},
});

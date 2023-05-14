import { Button, Handler, Modal, SlashCommand, SelectMenu, TextCommand } from "./elements";
import { Client, ClientOptions, Collection } from "discord.js";
import { importFile } from "../modules";
import { resolve } from "path";
import { glob } from "glob";

/**
 * Ядро.
 *
 * @class
 */
export class Core extends Client {
	/**
	 * Коллекция кнопок
	 *
	 * @type {Collection<string | string[], Button>}
	 */
	public readonly buttons: Collection<string | string[], Button> = new Collection();

	/**
	 * Коллекция хэндлеров
	 *
	 * @type {Collection<StringLiteralLike, Handler>}
	 */
	public readonly handlers: Collection<string | string[], Handler> = new Collection();

	/**
	 * Коллекция модальных окон
	 *
	 * @type {Collection<string, Modal>}
	 */
	public readonly modals: Collection<string | string[], Modal> = new Collection();

	/**
	 * Коллекция слеш комманд
	 *
	 * @type {Collection<string, SlashCommand>}
	 */
	public readonly slash_commands: Collection<string | string[], SlashCommand> = new Collection();

	/**
	 * Коллекция выпадающих списков
	 *
	 * @type {Collection<string, SelectMenu>}
	 */
	public readonly select_menus: Collection<string | string[], SelectMenu> = new Collection();

	/**
	 * Коллекция текстовых комманд
	 *
	 * @type {Collection<string, TextCommand>}
	 */
	public readonly text_commands: Collection<string | string[], TextCommand> = new Collection();

	/**
	 * @constructor
	 * @param {ClientOptions} options Настройки клиента
	 */
	constructor(options: ClientOptions) {
		super(options);
	}

	/**
	 * Функция для запуска бота
	 *
	 * @returns {Promise<void>}
	 */
	public readonly Launch = async (): Promise<void> => {
		await this.login(process.env.TOKEN);
		await this.StartHandlers();
	};

	/**
	 * Функция для запуска хэндлеров
	 *
	 * @returns {Promise<void>}
	 */
	public readonly StartHandlers = async (): Promise<void> => {
		const handlers: string[] = await glob("handlers/**/*{.ts,.js}", {
			cwd: resolve(process.cwd(), "src", "elements"),
		});

		if (handlers.length <= 0) return console.log("[HANDLING] У вас нет ни одного хэндлера!");

		handlers.forEach(async <P extends string>(filePath: P): Promise<unknown> => {
			const handler: Handler = await importFile(resolve(process.cwd(), "src", "elements", filePath));

			if (this.handlers.has(handler.name)) throw new Error(`[HANDLING] ${handler.name} уже существует!`);
			this.handlers.set(handler.name, handler);

			return await handler
				.run({ client: this, structure: handler })
				.catch((err) => console.error(`${handler.name}: \n${err}`));
		});
	};
}

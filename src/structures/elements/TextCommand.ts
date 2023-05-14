import { Message, PermissionResolvable } from "discord.js";
import { Core } from "../Core";

/**
 * Структура функции для запуска текстовой команды
 *
 * @interface
 */
interface TextCommandRunOptions {
	/**
	 * Клиент.
	 *
	 * @type {Core}
	 */
	client: Core;

	/**
	 * Сообщение из-за которого выполнилась команда.
	 *
	 * @type {Message<boolean>}
	 */
	message: Message<boolean>;

	/**
	 * Аргументы переданные в сообщение.
	 *
	 * @type {string[]}
	 */
	args: string[];

	/**
	 * Сама команда.
	 *
	 * @type {TextCommandStructureOptions}
	 */
	structure: TextCommandStructureOptions;
}

/**
 * Структура текстовой команды
 *
 * @interface
 */
interface TextCommandStructureOptions {
	/**
	 * Имя команды.
	 *
	 * @type {string}
	 */
	name: string;

	/**
	 * Описание команды.
	 *
	 * @type {string}
	 */
	description: string;

	/**
	 * Массив строк с айди серверов в которых можно использовать данную команду.
	 *
	 * @type {string[]}
	 */
	guildIDs?: string[];

	/**
	 * Массив строк с айди пользователей которые могут использовать данную команду.
	 *
	 * @type {string[]}
	 */
	userIDs?: string[];

	/**
	 * Массив с разрешениями для использования этой команды.
	 *
	 * @type {PermissionResolvable[]}
	 */
	permissions?: PermissionResolvable[];

	/**
	 * Должна ли данная команда запускаться в личных сообщениях.
	 *
	 * @type {boolean}
	 */
	runInDM?: boolean;

	/**
	 * Должна ли данная команда запускаться в канале с пометкой NSFW.
	 *
	 * @type {boolean}
	 */
	nsfwOnly?: boolean;

	/**
	 * Должен ли эту команду использовать только разработчик.
	 *
	 * @type {boolean}
	 */
	devOnly?: boolean;

	/**
	 * Дополнительные названия для запуска команды.
	 *
	 * @type {string[]}
	 */
	aliases?: string[];

	/**
	 * Функция для запуска команды.
	 *
	 * @type {CallableFunction}
	 * @param {TextCommandRunOptions} options Параметры переданные для запуска команды
	 * @returns {Promise<unknown>}
	 */
	run: (options: TextCommandRunOptions) => Promise<unknown>;
}

/**
 * Текстовая команда.
 *
 * ---
 * @example
 * ```ts
 * const command = new TextCommand({
 *      name: "ping",
 *      description: "Currently ping",
 *
 *      run: async ({ message }) => {
 *          return await message.reply("Pong!")
 *      }
 * });
 * ```
 * ---
 *
 * @class
 * @implements {TextCommandStructureOptions}
 */
export class TextCommand implements TextCommandStructureOptions {
	public name!: string;
	public description!: string;

	public guildIDs?: string[] = [];
	public userIDs?: string[] = [];
	public permissions?: PermissionResolvable[] = [];
	public runInDM?: boolean = false;
	public nsfwOnly?: boolean = false;
	public devOnly?: boolean = false;
	public aliases?: string[] = [];

	public readonly run: (options: TextCommandRunOptions) => Promise<unknown> = async () => {
		throw new Error(`У текстовой команды ${this.name} нет функции для запуска!`);
	};

	constructor(options: TextCommandStructureOptions) {
		if (!options.name) throw new Error(`[${__filename}]: У текстовой команды нет имени!`);

		Object.assign(this, options);
	}
}
